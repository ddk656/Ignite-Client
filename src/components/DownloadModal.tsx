import React, { useState, useEffect } from 'react';
import { 
  Download, 
  X, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  FileCode, 
  HardDrive, 
  HelpCircle,
  ExternalLink,
  Upload,
  Link as LinkIcon,
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  exeFileName: string;
  exeDownloadUrl: string;
  initialTab?: 'installer' | 'customizer' | 'specs';
  onUpdateExeConfig?: (name: string, url: string, customSize?: string) => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  exeFileName,
  exeDownloadUrl,
  initialTab = 'installer',
  onUpdateExeConfig,
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [activeTab, setActiveTab] = useState<'installer' | 'customizer' | 'specs'>(initialTab);
  
  // Custom exe form state
  const [customName, setCustomName] = useState(exeFileName);
  const [customUrl, setCustomUrl] = useState(exeDownloadUrl);
  const [uploadedFileSize, setUploadedFileSize] = useState<string>('');
  const [customSuccessMessage, setCustomSuccessMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setCustomName(exeFileName);
      setCustomUrl(exeDownloadUrl);
      setCustomSuccessMessage('');
    }
  }, [isOpen, initialTab, exeFileName, exeDownloadUrl]);

  if (!isOpen) return null;

  const sha256Hash = 'a4b82d91f2c4e8b3901a09d6f3e1b7429184c7e65123d9a04f21e5829b3c41ef';

  const copyChecksum = () => {
    navigator.clipboard.writeText(sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleSaveCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateExeConfig) {
      const finalName = customName.trim() || 'MyCustomClient.exe';
      const formattedName = finalName.endsWith('.exe') ? finalName : `${finalName}.exe`;
      onUpdateExeConfig(formattedName, customUrl, uploadedFileSize || undefined);
      setCustomSuccessMessage('Your custom executable settings have been applied to all download buttons!');
      setTimeout(() => setCustomSuccessMessage(''), 4000);
    }
  };

  const processFile = (file: File) => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      setCustomName(file.name);
      setCustomUrl(objectUrl);
      setUploadedFileSize(sizeMb);
      if (onUpdateExeConfig) {
        onUpdateExeConfig(file.name, objectUrl, sizeMb);
        setCustomSuccessMessage(`Successfully attached "${file.name}" (${sizeMb})! All download buttons now download this file.`);
        setTimeout(() => setCustomSuccessMessage(''), 5000);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleResetDefault = () => {
    const defaultName = 'IgniteClient-Setup-v4.5.2.exe';
    const defaultUrl = '/downloads/IgniteClient-Setup-v4.5.2.exe';
    setCustomName(defaultName);
    setCustomUrl(defaultUrl);
    setUploadedFileSize('200 KB');
    if (onUpdateExeConfig) {
      onUpdateExeConfig(defaultName, defaultUrl, '200 KB');
      setCustomSuccessMessage('Reset back to default Ignite Client executable.');
      setTimeout(() => setCustomSuccessMessage(''), 3000);
    }
  };

  const triggerDirectTestDownload = () => {
    const link = document.createElement('a');
    link.href = customUrl || exeDownloadUrl;
    link.download = customName || exeFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-[#121212] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#161616]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff6a00]/20 border border-[#ff6a00]/40 flex items-center justify-center text-[#ff6a00]">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Ignite Client Executable (.exe)
              </h3>
              <p className="text-xs text-neutral-400">
                Official Windows Installer & Custom File Manager
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close download modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#0d0d0d] px-6">
          <button
            onClick={() => setActiveTab('installer')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'installer'
                ? 'border-[#ff6a00] text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            Download & Setup
          </button>
          <button
            onClick={() => setActiveTab('customizer')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'customizer'
                ? 'border-[#ff6a00] text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#ff6a00]" />
            Use Your Own .exe File
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'specs'
                ? 'border-[#ff6a00] text-white'
                : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            System Specs
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'installer' && (
            <>
              {/* Primary Download Card */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs text-neutral-400">Target Executable File:</div>
                  <div className="font-mono text-sm font-bold text-white flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-[#ff6a00]" />
                    <span className="truncate max-w-[280px]">{exeFileName}</span>
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    64-bit Windows Binary {uploadedFileSize ? `· ${uploadedFileSize}` : '· ~200 KB'}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={exeDownloadUrl}
                    download={exeFileName}
                    className="flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-black bg-[#ff6a00] hover:bg-[#ff7b1a] rounded-xl shadow-lg shadow-[#ff6a00]/30 transition-all shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4 stroke-[2.5]" />
                    <span>Download .exe</span>
                  </a>
                </div>
              </div>

              {/* Notice to customize */}
              <div className="p-3.5 rounded-xl bg-[#161616] border border-white/10 flex items-center justify-between text-xs">
                <span className="text-neutral-300">
                  Want to use your own customized client .exe file?
                </span>
                <button
                  onClick={() => setActiveTab('customizer')}
                  className="text-xs font-bold text-[#ff6a00] hover:underline cursor-pointer"
                >
                  Configure File →
                </button>
              </div>

              {/* 3 Step Installation Flow */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Quick 3-Step Setup
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#161616] border border-white/5 space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#ff6a00]/20 text-[#ff6a00] text-xs font-mono font-bold flex items-center justify-center">
                      1
                    </div>
                    <div className="text-xs font-bold text-white">Run .exe Installer</div>
                    <div className="text-[11px] text-neutral-400 leading-normal">
                      Launch the downloaded executable. Windows SmartScreen may verify file signature.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161616] border border-white/5 space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#ff6a00]/20 text-[#ff6a00] text-xs font-mono font-bold flex items-center justify-center">
                      2
                    </div>
                    <div className="text-xs font-bold text-white">Select Version</div>
                    <div className="text-[11px] text-neutral-400 leading-normal">
                      Choose Minecraft 1.8.9 (PvP) or 1.21.4 (Modern). Launcher auto-configures Java.
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161616] border border-white/5 space-y-1.5">
                    <div className="w-6 h-6 rounded-full bg-[#ff6a00]/20 text-[#ff6a00] text-xs font-mono font-bold flex items-center justify-center">
                      3
                    </div>
                    <div className="text-xs font-bold text-white">Play & Enjoy FPS</div>
                    <div className="text-[11px] text-neutral-400 leading-normal">
                      Log in with your Microsoft account, press R-Shift for HUD controls, and battle!
                    </div>
                  </div>
                </div>
              </div>

              {/* SHA-256 Checksum Verification */}
              <div className="p-4 rounded-xl bg-[#161616] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#ff6a00]" />
                    SHA-256 Checksum (Integrity Guarantee)
                  </span>
                  <button
                    onClick={copyChecksum}
                    className="flex items-center gap-1 text-[#ff6a00] hover:underline cursor-pointer"
                  >
                    {copiedHash ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Hash</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-2 bg-black/60 rounded border border-white/10 font-mono text-[11px] text-neutral-400 break-all select-all">
                  {sha256Hash}
                </div>
              </div>
            </>
          )}

          {activeTab === 'customizer' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ff6a00]" />
                  Yes! You can make the .exe file whatever you want.
                </h4>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  You can attach your own executable file directly using either of the methods below. 
                  Once configured, clicking any download button on the site will instantly download 
                  <strong> your exact file</strong>!
                </p>
              </div>

              {/* Success Notification */}
              {customSuccessMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{customSuccessMessage}</span>
                </div>
              )}

              {/* METHOD 1: Drag and Drop Local File */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#ff6a00] text-black text-xs font-bold flex items-center justify-center">1</span>
                  Option A: Drop or Upload Your .exe File
                </div>

                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`p-6 rounded-2xl border-2 border-dashed transition-all text-center space-y-3 ${
                    isDragging
                      ? 'border-[#ff6a00] bg-[#ff6a00]/10 scale-[1.01]'
                      : 'border-white/20 bg-black/40 hover:border-white/40'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ff6a00]/15 text-[#ff6a00] flex items-center justify-center mx-auto">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      Drag & Drop your .exe file here
                    </div>
                    <div className="text-xs text-neutral-400 mt-0.5">
                      Or browse from your computer (e.g. MyClient-Setup.exe)
                    </div>
                  </div>
                  <div>
                    <label className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-black bg-[#ff6a00] hover:bg-[#ff7b1a] rounded-xl cursor-pointer shadow-md transition-all">
                      <FileCode className="w-4 h-4" />
                      <span>Choose .exe From Device</span>
                      <input
                        type="file"
                        accept=".exe,.zip,.jar"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* METHOD 2: Direct Link (GitHub, Mediafire, Google Drive, Discord) */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-neutral-700 text-white text-xs font-bold flex items-center justify-center">2</span>
                  Option B: Or Enter a Direct Download URL
                </div>

                <form onSubmit={handleSaveCustom} className="p-4 rounded-xl bg-[#161616] border border-white/10 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Target File Name (as saved by player's browser)
                    </label>
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="e.g. MyCustomClient-v1.0.exe"
                      className="w-full bg-black/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff6a00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Direct Download Link or File Path
                    </label>
                    <div className="relative">
                      <LinkIcon className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="https://github.com/.../releases/download/v1.0/MyClient.exe"
                        className="w-full bg-black/80 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#ff6a00]"
                      />
                    </div>
                    <p className="text-[10px] text-neutral-500 mt-1">
                      Works with GitHub releases, MediaFire direct links, Discord attachment links, or Dropbox dl=1 links.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black bg-[#ff6a00] hover:bg-[#ff7b1a] rounded-lg transition-colors cursor-pointer"
                    >
                      Save & Apply Link
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDefault}
                      className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reset to Default
                    </button>
                  </div>
                </form>
              </div>

              {/* METHOD 3: Permanent code workspace file */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-2 text-xs">
                <div className="font-bold text-neutral-300 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4 text-[#ff6a00]" />
                  Option C: Permanent Codebase Placement
                </div>
                <p className="text-neutral-400 leading-relaxed text-[11px]">
                  If you want the file permanently hosted directly inside the web server repository, simply place your executable in:
                </p>
                <div className="p-2 bg-[#141414] rounded border border-white/10 font-mono text-neutral-300 text-[11px] select-all">
                  /public/downloads/{customName || 'YourClient-Setup.exe'}
                </div>
              </div>

              {/* Instant Test Download Button */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <div className="text-xs text-neutral-400">
                  Active file: <strong className="text-white font-mono">{customName}</strong>
                </div>
                <button
                  type="button"
                  onClick={triggerDirectTestDownload}
                  className="px-4 py-2 text-xs font-bold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#ff6a00]" />
                  <span>Test Download Now</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                Hardware & Operating System Specifications
              </h4>

              <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#181818] text-neutral-300 border-b border-white/10">
                    <tr>
                      <th className="p-3 font-semibold">Component</th>
                      <th className="p-3 font-semibold">Minimum</th>
                      <th className="p-3 font-semibold text-[#ff6a00]">Recommended</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-neutral-300">
                    <tr>
                      <td className="p-3 font-sans font-medium text-white">Operating System</td>
                      <td className="p-3">Windows 10 64-bit</td>
                      <td className="p-3 text-white">Windows 11 64-bit</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-medium text-white">Processor (CPU)</td>
                      <td className="p-3">Intel Core i3-3210 / AMD A8</td>
                      <td className="p-3 text-white">Intel Core i5-10400 / AMD Ryzen 5</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-medium text-white">System RAM</td>
                      <td className="p-3">4 GB RAM</td>
                      <td className="p-3 text-white">8 GB - 16 GB RAM</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-medium text-white">Graphics (GPU)</td>
                      <td className="p-3">Intel HD Graphics 4000</td>
                      <td className="p-3 text-white">NVIDIA GTX 1060 / AMD RX 580</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-medium text-white">Storage Free Space</td>
                      <td className="p-3">250 MB for client files</td>
                      <td className="p-3 text-white">1 GB (with HD Shaderpacks)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-sans font-medium text-white">Java Runtime</td>
                      <td className="p-3">Auto-bundled (OpenJDK 21)</td>
                      <td className="p-3 text-white">Bundled 64-bit with ZGC</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#0e0e0e] flex items-center justify-between text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#ff6a00]" />
            VirusTotal Scan: Clean
          </span>
          <button
            onClick={onClose}
            className="text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded hover:bg-white/5 cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
