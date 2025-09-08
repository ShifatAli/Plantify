/* eslint-disable no-empty */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaCamera } from "react-icons/fa";

export default function Hero() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showCamera, setShowCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const openCamera = async () => {
    setShowCamera(true);
    setCameraReady(false);

    setTimeout(async () => {
      try {
        const tryConstraints = async (ctr) =>
          await navigator.mediaDevices.getUserMedia(ctr);

        let stream;
        try {
          stream = await tryConstraints({
            video: { facingMode: { exact: "environment" } },
          });
        } catch {
          try {
            stream = await tryConstraints({
              video: { facingMode: { ideal: "environment" } },
            });
          } catch {
            stream = await tryConstraints({ video: true });
          }
        }

        streamRef.current = stream;

        if (videoRef.current) {
          const v = videoRef.current;
          v.srcObject = stream;
          v.muted = true;
          v.playsInline = true;

          const onCanPlay = () => {
            setCameraReady(true);
            v.removeEventListener("canplay", onCanPlay);
          };
          v.addEventListener("canplay", onCanPlay);

          await v.play().catch(() => {});
        }
      } catch (err) {
        console.error("Camera access error:", err);
        alert(
          "Unable to access camera. Please check permissions or use HTTPS/localhost."
        );
        closeCamera();
      }
    }, 50);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 720;

    const targetW = Math.min(1280, vw);
    const scale = targetW / vw;
    const targetH = Math.round(vh * scale);

    canvas.width = targetW;
    canvas.height = targetH;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, targetW, targetH);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const file = new File([blob], "captured.jpg", { type: "image/jpeg" });
        setImage(file);

        if (preview) URL.revokeObjectURL(preview);
        const url = URL.createObjectURL(file);
        setPreview(url);

        closeCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  const closeCamera = () => {
    try {
      streamRef.current?.getTracks()?.forEach((t) => t.stop());
    } catch {}
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.srcObject = null;
    }
    streamRef.current = null;
    setShowCamera(false);
    setCameraReady(false);
  };

  useEffect(() => {
    return () => {
      try {
        streamRef.current?.getTracks()?.forEach((t) => t.stop());
      } catch {}
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleIdentify = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("images", image);
    formData.append("similar_images", "true");
    formData.append("classification_level", "all");
    formData.append("health", "all");

    try {
      const response = await fetch("https://api.plant.id/v3/identification", {
        method: "POST",
        headers: {
          "Api-Key": "KrCSmsI6VH8bKLTeBs22lQNFaGYKt20WVCkrT0EDhHGEt3I0mr",
        },
        body: formData,
      });

      const result = await response.json();
      navigate("/results", { state: { plantData: result, image: preview } });
    } catch (error) {
      console.error("Error identifying plant:", error);
      alert("Failed to identify. Please try another photo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white rounded-2xl w-full max-w-2xl text-center space-y-6">
        {/* Upload & Camera Buttons */}
        <div className="flex flex-row items-center justify-center gap-3 w-full">
          <label className="flex-1 inline-flex items-center justify-center whitespace-nowrap gap-2 rounded-lg bg-[#5AAC38] px-3 sm:px-5 py-3 text-sm sm:text-base text-white font-medium hover:bg-green-700 transition cursor-pointer">
            <FaDownload className="text-white text-base sm:text-lg flex-shrink-0" />
            <span>Upload Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <button
            onClick={openCamera}
            className="flex-1 inline-flex items-center justify-center whitespace-nowrap gap-2 rounded-lg bg-[#5AAC38] px-3 sm:px-5 py-3 text-sm sm:text-base text-white font-medium hover:bg-green-700 transition"
          >
            <FaCamera className="text-white text-base sm:text-lg flex-shrink-0" />
            <span>Click to Upload</span>
          </button>
        </div>
      </div>

      {/* Popup for Preview + Identify */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md text-center space-y-4 relative">
            {/* Close button */}
            <button
              onClick={() => {
                URL.revokeObjectURL(preview);
                setPreview(null);
                setImage(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg"
            >
              ✖
            </button>

            {/* Preview Image */}
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl mx-auto"
            />

            {/* Identify button */}
            <button
              onClick={handleIdentify}
              disabled={!image || loading}
              className="w-full py-2 sm:py-3 px-4 bg-[#5AAC38] text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:bg-gray-300 disabled:text-gray-500 text-sm sm:text-base"
            >
              {loading ? "🌿 Identifying..." : "🔍 Identify Plant"}
            </button>
          </div>
        </div>
      )}

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="w-[92vw] max-w-3xl mx-auto">
            <div className="relative rounded-xl overflow-hidden bg-black border border-white/10">
              <video
                ref={videoRef}
                className="w-full max-h-[70vh] object-contain bg-black"
                playsInline
                autoPlay
                muted
              />
              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white/80 text-sm animate-pulse">
                    Initializing camera…
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              <button
                onClick={capturePhoto}
                disabled={!cameraReady}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-green-600 text-white text-sm sm:text-base hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                📸 Capture
              </button>
              <button
                onClick={closeCamera}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-red-600 text-white text-sm sm:text-base hover:bg-red-700"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
          <canvas ref={canvasRef} className="hidden"></canvas>
        </div>
      )}
    </div>
  );
}
