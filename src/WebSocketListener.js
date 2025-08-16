import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export default function WebSocketListener() {
  const [status, setStatus] = useState(""); // Current message/status
  const [rawMsg, setRawMsg] = useState(""); // Logs raw messages for debugging

  useEffect(() => {
    // Update ONLY THIS line if your backend is at a new host/port!
    const socket = new SockJS("http://localhost:8082/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.subscribe("/topic/fileStatus", (msg) => {
          setRawMsg(msg.body); // Always log received messages to UI
          let data;
          try {
            data = JSON.parse   (msg.body);
          } catch {
            setStatus("Malformed message received.");
            return;
          }

          // Diagnostic log (visit browser DevTools Console to see)
          console.log("Received WebSocket message:", data);

          // Status handling logic
          if (data.status === "start-processing") {
            setStatus("Processing...");
          } else if (data.status === "process-complete") {
            setTimeout(() => {
              setStatus("Process Complete!");
            }, 20); // At least 20ms delay
          } else if (data.status === "error") {
            setStatus(`Error: ${data.message || "Unknown error."}`);
          } else if (data.message) {
            setStatus(data.message);
          } else {
            setStatus("Processed Complete!");
          }
        });
      },
      onStompError: (frame) => {
        setStatus("WebSocket error: " + frame.headers["message"]);
      }
    });

    stompClient.activate();

    return () => stompClient.deactivate();
  }, []);

  return (
    <div style={{ padding: "1rem", background: "#f0f0f0", marginTop: "2rem", borderRadius: "10px" }}>
      <h2>📡 WebSocket Update</h2>
      {status && <p>{status}</p>}
      <pre style={{ fontSize: "0.8em", color: "#999", marginTop: "1em" }}>
        <strong>Raw message:</strong> {rawMsg}
      </pre>
    </div>
  );
}
