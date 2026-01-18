import React, { useEffect, useState } from "react";
import { Download, Share, PlusSquare, X, MoreVertical } from "lucide-react";
import { GiWashingMachine } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isInstalled =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://");

    if (isInstalled) {
      setIsStandalone(true);
    }

    // Detect iOS
    const ios =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    // Capture install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    } else {
      // If no prompt available (like on iOS), show instructions
      setShowModal(true);
    }
  };

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setShowModal(false);
  };

  if (isStandalone) return null;

  return (
    <>
      {/* --- 1. FLOATING INSTALL BUTTON (Chicora Theme) --- */}
      <AnimatePresence>
        {!isStandalone && (
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleInstallClick}
            // UPDATED POSITIONING HERE:
            // Changed 'bottom-24' to 'bottom-4' to sit standardly at the bottom right
            // Added 'safe-area-inset-bottom' support for newer iPhones
            className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[900] group flex items-center gap-3 pl-2 pr-5 py-2 bg-white/95 backdrop-blur-md border border-blue-100 rounded-full shadow-[0_4px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.3)] hover:border-blue-200 transition-all duration-300 pb-safe"
          >
            {/* Icon Container */}
            <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full text-white shadow-md group-hover:scale-105 transition-transform">
              <Download
                size={18}
                className="animate-bounce"
                strokeWidth={2.5}
              />
            </div>

            {/* Text Label */}
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider leading-none mb-0.5">
                Get the App
              </span>
              <span className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                Install Chicora
              </span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- 2. INSTRUCTION MODAL (Clean Light Theme) --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-white rounded-[24px] p-6 shadow-2xl overflow-hidden mb-safe sm:mb-0"
            >
              {/* Blue Header Background */}
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-blue-600 to-blue-500 opacity-10" />
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20" />

              {/* Header */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <GiWashingMachine className="text-blue-600 text-2xl" />
                    Install Chicora
                  </h3>
                  <p className="text-[11px] text-blue-500 uppercase tracking-widest font-bold mt-1">
                    {isIOS ? "iOS Installation" : "Browser Installation"}
                  </p>
                </div>

                <button
                  onClick={handleCloseModal}
                  className="relative z-50 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-all active:scale-90"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>

              {/* Instructions Steps */}
              <div className="space-y-4 relative z-10">
                {/* Step 1 */}
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm">
                    {isIOS ? <Share size={20} /> : <MoreVertical size={20} />}
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">
                      Step 01
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      Tap the{" "}
                      <span className="text-blue-600 font-bold">
                        {isIOS ? "Share" : "Menu"}
                      </span>{" "}
                      button
                    </p>
                  </div>
                </div>

                {/* Connector Line */}
                <div className="flex justify-center -my-2">
                  <div className="h-6 w-0.5 bg-blue-100 rounded-full" />
                </div>

                {/* Step 2 */}
                <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm">
                    <PlusSquare size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-0.5">
                      Step 02
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      Select{" "}
                      <span className="text-blue-600 font-bold">
                        Add to Home Screen
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer / Value Prop */}
              <div className="mt-8 pt-4 border-t border-gray-100 text-center flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                  Premium Laundry Service
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InstallPWA;
