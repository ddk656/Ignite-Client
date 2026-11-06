import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HudStudio } from './components/HudStudio';
import { PerformanceSection } from './components/PerformanceSection';
import { ModsShowcase } from './components/ModsShowcase';
import { CosmeticsLocker } from './components/CosmeticsLocker';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { DownloadModal } from './components/DownloadModal';

export default function App() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<'installer' | 'customizer' | 'specs'>('installer');
  const [exeFileName, setExeFileName] = useState(() => {
    return localStorage.getItem('ignite_exe_name') || 'IgniteClient-Setup-v4.5.2.exe';
  });
  const [exeDownloadUrl, setExeDownloadUrl] = useState(() => {
    return localStorage.getItem('ignite_exe_url') || '/downloads/IgniteClient-Setup-v4.5.2.exe';
  });
  const [fileSize, setFileSize] = useState(() => {
    const saved = localStorage.getItem('ignite_exe_size');
    return saved && saved !== '84.6 MB' ? saved : '200 KB';
  });

  // Universal download trigger: triggers the real file download and opens setup modal
  const triggerDownload = () => {
    // 1. Trigger browser direct download of the .exe file
    const link = document.createElement('a');
    link.href = exeDownloadUrl;
    link.download = exeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 2. Open the modal with setup instructions
    setModalTab('installer');
    setIsDownloadModalOpen(true);
  };

  const openConfigModal = () => {
    setModalTab('customizer');
    setIsDownloadModalOpen(true);
  };

  const handleUpdateExeConfig = (name: string, url: string, customSize?: string) => {
    setExeFileName(name);
    setExeDownloadUrl(url);
    if (customSize) {
      setFileSize(customSize);
      localStorage.setItem('ignite_exe_size', customSize);
    }
    localStorage.setItem('ignite_exe_name', name);
    // Note: object URLs are per-session, but string URLs persist
    if (!url.startsWith('blob:')) {
      localStorage.setItem('ignite_exe_url', url);
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col selection:bg-[#ff6a00] selection:text-black">
      {/* Top Bar */}
      <Navbar 
        onOpenDownload={triggerDownload} 
        onOpenConfig={openConfigModal}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onDownload={triggerDownload} 
          onOpenConfig={openConfigModal}
          clientVersion="v4.5.2" 
          fileSize={fileSize}
        />

        {/* Interactive In-Game HUD Studio */}
        <HudStudio />

        {/* FPS Performance & Benchmark Section */}
        <PerformanceSection />

        {/* 60+ Mods Showcase */}
        <ModsShowcase />

        {/* Cosmetics & Capes Locker */}
        <CosmeticsLocker />

        {/* FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Quiet Footer */}
      <Footer 
        onOpenDownload={triggerDownload} 
        onOpenConfig={openConfigModal}
      />

      {/* Mobile Sticky CTA Bar (<15% viewport height) */}
      <MobileStickyBar 
        onDownload={triggerDownload} 
        fileName={exeFileName}
      />

      {/* Download and Setup Walkthrough Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        exeFileName={exeFileName}
        exeDownloadUrl={exeDownloadUrl}
        initialTab={modalTab}
        onUpdateExeConfig={handleUpdateExeConfig}
      />
    </div>
  );
}
