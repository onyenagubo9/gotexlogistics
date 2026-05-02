"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

/* ================= TYPES ================= */

type Location = {
  lat: number;
  lng: number;
  address: string;
};

type TimelineItem = {
  id: string;
  status: string;
  message: string;
  timestamp: any;
};

type Order = {
  id: string;
  trackingNumber: string;
  status: string;
  priority?: string;
  fragile?: boolean;
  insured?: boolean;
  insuranceAmount?: number;
  payment?: {
    status: string;
    method: string;
    currency: string;
    amount: number;
  };
  pickup: any;
  recipient: any;
  package: any;
  tracking?: {
    currentLocation: Location;
    lastUpdated: any;
  };
};

/* ================= PAGE ================= */

export default function AdminOrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const receiptRef = useRef<HTMLDivElement>(null);

  const [order, setOrder] = useState<Order | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  // Form States for Updates
  const [status, setStatus] = useState("in_transit");
  const [newLat, setNewLat] = useState<number>(0);
  const [newLng, setNewLng] = useState<number>(0);
  const [newAddress, setNewAddress] = useState<string>("");

  /* ---------- FETCH DATA ---------- */
  async function fetchData() {
    try {
      const snap = await getDoc(doc(db, "orders", orderId));
      if (snap.exists()) {
        const data = snap.data();
        
        // FIX: Spread data first, then assign ID to avoid TS2783 error
        const orderData = { ...data, id: snap.id } as Order;
        
        setOrder(orderData);
        setStatus(orderData.status);
        setNewLat(orderData.tracking?.currentLocation?.lat || 0);
        setNewLng(orderData.tracking?.currentLocation?.lng || 0);
        setNewAddress(orderData.tracking?.currentLocation?.address || "");
      }

      const q = query(
        collection(db, "orders", orderId, "timeline"),
        orderBy("timestamp", "asc")
      );
      const timelineSnap = await getDocs(q);
      setTimeline(timelineSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [orderId]);

  /* ---------- PDF DOWNLOAD (Color-Safe Version) ---------- */
  const downloadPDF = async () => {
    if (!receiptRef.current) return;
    setIsDownloading(true);

    try {
      const jsPDF = (await import("jspdf")).default;
      const html2canvas = (await import("html2canvas")).default;

      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`Waybill-${order?.trackingNumber}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
      alert("PDF Error: Please ensure no modern CSS colors (lab/lch) are active.");
    } finally {
      setIsDownloading(false);
    }
  };

  /* ---------- UPDATE ACTIONS ---------- */
  async function updateStatus() {
    if (!order) return;
    await updateDoc(doc(db, "orders", order.id), {
      status,
      updatedAt: serverTimestamp(),
    });
    await addDoc(collection(db, "orders", order.id, "timeline"), {
      status,
      message: `Order marked as ${status.replace("_", " ")}`,
      timestamp: serverTimestamp(),
    });
    alert("✅ Status updated");
    fetchData();
  }

  async function updateLocation() {
    if (!order) return;
    await updateDoc(doc(db, "orders", order.id), {
      "tracking.currentLocation": {
        lat: Number(newLat),
        lng: Number(newLng),
        address: newAddress || "In Transit",
      },
      "tracking.lastUpdated": serverTimestamp(),
    });
    alert("📍 Location updated");
    fetchData();
  }

  if (loading) return <div className="p-20 text-center font-mono">LOADING SYSTEM...</div>;
  if (!order) return <div className="p-20 text-center text-red-500">ENTRY NOT FOUND</div>;

  return (
    <main className="p-8 space-y-8 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Logistics Control</h1>
          <p className="text-sm text-gray-500">ID: {order.id}</p>
        </div>
        <button 
          onClick={downloadPDF}
          disabled={isDownloading}
          className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 disabled:bg-gray-300 transition-all shadow-lg"
        >
          {isDownloading ? "PROCESSING..." : "EXPORT PDF WAYBILL"}
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GPS COORDINATES CONTROL */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Live Tracking Adjustment</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Latitude</label>
              <input 
                type="number" 
                step="any"
                value={newLat} 
                className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:bg-white outline-none" 
                onChange={(e) => setNewLat(parseFloat(e.target.value))} 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Longitude</label>
              <input 
                type="number" 
                step="any"
                value={newLng} 
                className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:bg-white outline-none" 
                onChange={(e) => setNewLng(parseFloat(e.target.value))} 
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Current Transit Point</label>
            <input 
              type="text" 
              value={newAddress} 
              className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:bg-white outline-none" 
              onChange={(e) => setNewAddress(e.target.value)} 
              placeholder="e.g. Frankfurt Cargo Hub"
            />
          </div>
          <button onClick={updateLocation} className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl mt-6 hover:bg-blue-700 shadow-md transition-all">
            PUSH LOCATION UPDATE
          </button>
        </div>

        {/* STATUS CONTROL */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Shipment Lifecycle</h2>
          <label className="block text-[10px] font-bold text-gray-500 uppercase mb-1">Status Protocol</label>
          <select 
            className="w-full border border-gray-200 p-3 rounded-xl bg-gray-50 focus:bg-white outline-none appearance-none" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="assigned">ASSIGNED</option>
            <option value="in_transit">IN TRANSIT</option>
            <option value="out_for_delivery">OUT FOR DELIVERY</option>
            <option value="delivered">DELIVERED</option>
          </select>
          <button onClick={updateStatus} className="w-full bg-yellow-400 text-black font-bold py-4 rounded-xl mt-6 hover:bg-yellow-500 shadow-md transition-all">
            EXECUTE STATUS CHANGE
          </button>
        </div>
      </div>

      {/* ISOLATED RECEIPT TEMPLATE (SAFE COLORS) */}
      <div className="max-w-4xl mx-auto py-10">
        <div 
          ref={receiptRef} 
          style={{ 
            width: "800px", 
            margin: "0 auto", 
            padding: "60px",
            backgroundColor: "#ffffff", 
            color: "#000000", 
            fontFamily: "Arial, sans-serif",
            border: "1px solid #dddddd"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "60px" }}>
            <div>
              <h1 style={{ margin: 0, fontSize: "36px", fontWeight: "900", color: "#cc0000", letterSpacing: "-1.5px" }}>GOTEX</h1>
              <p style={{ margin: 0, fontSize: "12px", textTransform: "uppercase", letterSpacing: "4px", color: "#888888" }}>Logistics Solutions</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: "bold", fontSize: "22px" }}>{order.trackingNumber}</p>
              <p style={{ margin: 0, fontSize: "10px", color: "#888888", textTransform: "uppercase" }}>Master Waybill No.</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", borderTop: "4px solid #000000", borderBottom: "1px solid #eeeeee", padding: "40px 0", marginBottom: "40px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "bold", color: "#888888", textTransform: "uppercase", marginBottom: "15px" }}>Shipper Details</p>
              <p style={{ margin: "0 0 5px 0", fontWeight: "bold", fontSize: "18px" }}>{order.pickup?.name}</p>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>{order.pickup?.address}</p>
              <p style={{ margin: "10px 0 0 0", fontSize: "14px", fontWeight: "bold" }}>{order.pickup?.phone}</p>
            </div>
            <div>
              <p style={{ fontSize: "11px", fontWeight: "bold", color: "#888888", textTransform: "uppercase", marginBottom: "15px" }}>Consignee Details</p>
              <p style={{ margin: "0 0 5px 0", fontWeight: "bold", fontSize: "18px" }}>{order.recipient?.name}</p>
              <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.4" }}>{order.recipient?.address}</p>
              <p style={{ margin: "10px 0 0 0", fontSize: "14px", fontWeight: "bold" }}>{order.recipient?.phone}</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "25px", marginBottom: "40px" }}>
            <div style={{ padding: "25px", backgroundColor: "#f4f4f4" }}>
              <p style={{ margin: 0, fontSize: "10px", color: "#888888", textTransform: "uppercase" }}>Description</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "16px", fontWeight: "bold" }}>{order.package?.goodsName}</p>
            </div>
            <div style={{ padding: "25px", backgroundColor: "#f4f4f4" }}>
              <p style={{ margin: 0, fontSize: "10px", color: "#888888", textTransform: "uppercase" }}>Weight (KG)</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "16px", fontWeight: "bold" }}>{order.package?.weight}</p>
            </div>
            <div style={{ padding: "25px", backgroundColor: "#f4f4f4" }}>
              <p style={{ margin: 0, fontSize: "10px", color: "#888888", textTransform: "uppercase" }}>System Status</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "16px", fontWeight: "bold", color: "#cc0000" }}>{order.status.toUpperCase()}</p>
            </div>
          </div>

          <div style={{ padding: "25px", border: "1px solid #eeeeee", marginBottom: "40px" }}>
             <p style={{ margin: 0, fontSize: "10px", color: "#888888", textTransform: "uppercase" }}>Current Global Position</p>
             <p style={{ margin: "5px 0 0 0", fontSize: "16px", fontWeight: "bold" }}>{order.tracking?.currentLocation?.address}</p>
             <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#888888" }}>GPS: {order.tracking?.currentLocation?.lat}, {order.tracking?.currentLocation?.lng}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "30px", backgroundColor: "#000000", color: "#ffffff" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "2px" }}>Total Amount Declared</span>
            <span style={{ fontSize: "32px", fontWeight: "900" }}>{order.payment?.currency} {order.payment?.amount?.toLocaleString()}</span>
          </div>

          <p style={{ marginTop: "60px", textAlign: "center", fontSize: "11px", color: "#aaaaaa", textTransform: "uppercase", letterSpacing: "2px" }}>
            Security Verified Waybill • {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
}