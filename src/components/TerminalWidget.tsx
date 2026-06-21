import { useState, useEffect, useRef } from "react";
import { Terminal, Copy, Check, Play, FileText, User } from "lucide-react";

export default function TerminalWidget() {
  const [selectedCmd, setSelectedCmd] = useState<"philosophy" | "profile" | "python">("philosophy");
  const [typedContent, setTypedContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getCommandString = () => {
    switch (selectedCmd) {
      case "philosophy":
        return "cat philosophy.txt";
      case "profile":
        return "cat specs_intro.json";
      case "python":
        return "python load_mindset.py";
    }
  };

  const getContentString = () => {
    switch (selectedCmd) {
      case "philosophy":
        return `> Reading philosophy.txt...

"Không bao giờ nói KHÔNG BIẾT, 
 mà chỉ nói là CHƯA BIẾT."

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* Ý nghĩa từ Thầy Nguyễn Quốc Dũng:
- Hôm nay ta có thể chưa biết code, chưa biết sửa lỗi, chưa biết thuật toán.
- Nhưng qua việc tự học và kiên trì rèn luyện, ngày mai ta nhất định sẽ biết!`;

      case "profile":
        return `{
  "giao_vien": "Nguyễn Quốc Dũng",
  "tuoi": 24,
  "vai_tro": "Giáo viên Tin học tại Việt Anh 3",
  "he_gia_tri": {
    "tan_tam": true,
    "sang_tao": "100%",
    "tich_cuc": "Vô hạn"
  },
  "ky_nang": ["Python", "JavaScript", "AI Literacy", "Robotics", "Scratch"]
}`;

      case "python":
        return `>>> Initializing classroom_mindset_check...
>>> Looking for ready-to-learn students... Found 1000+ active brains!
>>> Loading lesson_01: Algorithmic Thinking
>>> Analyzing student motivation profiles: Excellent!

------------------------------------------
Status code: SUCCESS (200 OK)
"Chào mừng các em bước vào thế giới Công nghệ thông tin!"
------------------------------------------`;
    }
  };

  // Typing effect when selected command changes
  useEffect(() => {
    const fullText = getContentString();
    setTypedContent("");
    setIsTyping(true);
    let index = 0;
    
    // Type characters sequentially
    const chunk = Math.max(Math.ceil(fullText.length / 50), 1); // faster chunking for volume
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedContent((prev) => prev + fullText.substring(index, index + chunk));
        index += chunk;
        
        // Auto scroll terminal body down
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [selectedCmd]);

  // Handle auto-switching path loop: philosophy -> profile -> python -> philosophy
  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        if (selectedCmd === "philosophy") {
          setSelectedCmd("profile");
        } else if (selectedCmd === "profile") {
          setSelectedCmd("python");
        } else if (selectedCmd === "python") {
          setSelectedCmd("philosophy");
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, selectedCmd]);

  const copyToClipboard = () => {
    const rawContent = `dung@vietanh3:~$ ${getCommandString()}\n${getContentString()}`;
    navigator.clipboard.writeText(rawContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-xl border border-white/10 bg-dark-card/90 overflow-hidden shadow-2xl shadow-black/60 relative group">
      {/* Glow highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyber-cyan/5 via-transparent to-cyber-purple/5 opacity-80 pointer-events-none" />

      {/* OS standard window frame */}
      <div className="bg-slate-900/60 px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 shadow-md shadow-rose-500/20" />
          <div className="w-3 h-3 rounded-full bg-amber-500 shadow-md shadow-amber-500/20" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/20" />
          <span className="font-mono text-xs text-gray-400 pl-2 select-none flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyber-cyan" />
            dung@vietanh3_tin_hoc_cli:~
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
          title="Sao chép nội dung"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Side tools / Scripts panel */}
      <div className="flex flex-col sm:flex-row h-[320px]">
        <div className="w-full sm:w-1/3 bg-slate-950/40 border-r border-white/5 p-3 flex flex-row sm:flex-col gap-2 overflow-x-auto sm:overflow-x-visible">
          <span className="hidden sm:block font-mono text-[10px] text-gray-500 px-2 uppercase tracking-wider mb-2">
            Chọn chương trình:
          </span>
          
          <button
            onClick={() => setSelectedCmd("philosophy")}
            disabled={isTyping}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-mono transition-all w-full text-left whitespace-nowrap cursor-pointer ${
              selectedCmd === "philosophy"
                ? "bg-cyber-cyan/10 text-cyber-cyan border border-cyber-cyan/30"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            } ${isTyping ? "opacity-72 cursor-not-allowed" : ""}`}
            id="btn-cmd-philosophy"
          >
            <FileText className="w-3.5 h-3.5 flex-shrink-0" />
            <span>philosophy.txt</span>
          </button>

          <button
            onClick={() => setSelectedCmd("profile")}
            disabled={isTyping}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-mono transition-all w-full text-left whitespace-nowrap cursor-pointer ${
              selectedCmd === "profile"
                ? "bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/30"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            } ${isTyping ? "opacity-72 cursor-not-allowed" : ""}`}
            id="btn-cmd-profile"
          >
            <User className="w-3.5 h-3.5 flex-shrink-0" />
            <span>specs_intro.json</span>
          </button>

          <button
            onClick={() => setSelectedCmd("python")}
            disabled={isTyping}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-mono transition-all w-full text-left whitespace-nowrap cursor-pointer ${
              selectedCmd === "python"
                ? "bg-cyber-emerald/10 text-cyber-emerald border border-cyber-emerald/30"
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            } ${isTyping ? "opacity-72 cursor-not-allowed" : ""}`}
            id="btn-cmd-python"
          >
            <Play className="w-3.5 h-3.5 flex-shrink-0 text-cyber-emerald fill-cyber-emerald/10" />
            <span>load_mindset.py</span>
          </button>
        </div>

        {/* Console space */}
        <div 
          ref={scrollRef}
          className="w-full sm:w-2/3 p-4 font-mono text-xs overflow-y-auto bg-slate-950/80 text-gray-350 select-text flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center space-x-1.5 mb-2.5 text-gray-400">
              <span className="text-emerald-400">dung@vietanh3</span>
              <span>:</span>
              <span className="text-blue-400">~</span>
              <span className="text-indigo-400">$</span>
              <span className="text-white hover:underline transition">{getCommandString()}</span>
            </div>

            <pre className="whitespace-pre-wrap leading-relaxed text-gray-200">
              {typedContent}
              {isTyping && (
                <span className="inline-block w-2 h-4 bg-cyber-cyan animate-pulse ml-0.5" />
              )}
            </pre>
          </div>

          {!isTyping && (
            <div className="mt-4 pt-3 border-t border-white/5 text-[10.5px] text-gray-500 flex justify-between items-center select-none">
              <span>Exit code: 0</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                terminal ready
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
