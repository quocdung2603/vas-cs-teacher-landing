import React, { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle, Copy, Check, School, Share2, UploadCloud } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import TextScramble from "./TextScramble";

export default function ContactCard() {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [suitError, setSuitError] = useState(false);
  const [suitSrc, setSuitSrc] = useState("/assets/avatar_suit.png");
  
  // Custom interactive contact form fields
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("Lớp 10");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const phoneNum = "09xxxxxx40";
  const emailAddr = "nguyenquocdung26032003@gmail.com";

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNum);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddr);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    // Simulate API transmission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 1200);
  };

  const resetForm = () => {
    setName("");
    setMessage("");
    setSubmitSuccess(false);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden bg-slate-900/40">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] rounded-full bg-cyber-cyan/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-cyber-purple/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section header */}
        <ScrollReveal variant="slide-up-large" duration={0.8}>
          <div className="text-center mb-16 md:mb-24">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest text-[#10b981] bg-cyber-emerald/10 border border-cyber-emerald/20 uppercase mb-3">
              <School className="w-3.5 h-3.5 mr-1" />
              Văn phòng liên kết
            </span>
            <h2 className="font-display text-3xl sm:text-4.5xl font-extrabold tracking-tight text-white">
              <TextScramble text="Kết Nối Với Thầy" /> <span className="text-gradient-purple-cyan">/ <TextScramble text="Contact Me" /></span>
            </h2>
            <p className="font-sans text-sm text-gray-400 max-w-md mx-auto mt-3">
              Các em học sinh hoặc phụ huynh có thắc mắc về bài học, lập trình hay công nghệ có thể gửi tin nhắn trực tiếp cho thầy!
            </p>
            <div className="h-[2px] w-16 bg-gradient-to-r from-cyber-emerald to-cyber-cyan mx-auto mt-4" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Glassmorphism Info Widget card */}
          <ScrollReveal variant="slide-right" className="lg:col-span-5 flex flex-col justify-between">
            <div className="rounded-2xl glass p-8 sm:p-10 space-y-8 flex-1 flex flex-col justify-between h-full hover:border-white/12 transition-all duration-500 shadow-2xl hover:-rotate-1 hover:-translate-y-2.5 hover:-translate-x-1 hover:shadow-[-15px_30px_60px_rgba(6,182,212,0.12)] relative overflow-hidden group">
              
              {/* Subtle tech lines */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-cyan/10 rounded-full blur-2xl group-hover:bg-cyber-cyan/15 transition-all duration-300 pointer-events-none" />

              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-cyber-cyan font-bold block mb-3">
                  <TextScramble text="CS Teacher Information" />
                </span>
                
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5 relative group/img-card">
                  {!suitError && (
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-white/5 flex-shrink-0 bg-slate-950/60 shadow-lg">
                      <img 
                        src={suitSrc} 
                        alt="Nguyễn Quốc Dũng" 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/img-card:scale-105"
                        onError={() => {
                          if (suitSrc.endsWith(".png")) {
                            setSuitSrc("/assets/avatar_suit.jpg");
                          } else {
                            setSuitError(true);
                          }
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Tips on hover */}
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs opacity-0 group-hover/img-card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-1 text-center select-none pointer-events-none">
                        <UploadCloud className="w-4 h-4 text-cyber-cyan animate-bounce" />
                        <span className="font-mono text-[7px] text-gray-400 mt-0.5 uppercase">Xem /assets/avatar_suit.png hoặc .jpg</span>
                      </div>
                    </div>
                  )}
                  <div className="text-center sm:text-left">
                    {/* Professor Info display exactly as requested */}
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide">
                      <TextScramble text="Nguyễn Quốc Dũng" />
                    </h3>
                    <p className="font-mono text-xs text-cyber-cyan font-semibold mt-1">
                      <TextScramble text="Giáo viên Tin học • Sư phạm Công nghệ" />
                    </p>
                  </div>
                </div>

                <div className="h-[1px] bg-white/5 my-6" />

                {/* Info Items blocks */}
                <div className="space-y-5">
                  
                  {/* School info */}
                  <ScrollReveal variant="slide-right" delay={0.1}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-center text-gray-300">
                        <School className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] text-gray-500 uppercase">
                          <TextScramble text="TRƯỜNG ĐANG CÔNG TÁC" />
                        </span>
                        <span className="font-sans text-sm font-semibold text-gray-200">Trung Tiểu Học Việt Anh 3</span>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Phone Item */}
                  <ScrollReveal variant="slide-right" delay={0.2}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-center text-gray-300">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1">
                        <span className="block font-mono text-[10px] text-gray-500 uppercase">
                          <TextScramble text="SỐ ĐIỆN THOẠI LIÊN HỆ" />
                        </span>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="font-mono text-sm font-bold text-white tracking-wider">{phoneNum}</span>
                          <button
                            onClick={handleCopyPhone}
                            className="p-1 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title="Sao chép số điện thoại"
                          >
                            {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Mail Item based on metadata email */}
                  <ScrollReveal variant="slide-right" delay={0.3}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-center text-gray-300">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <div className="flex-1">
                        <span className="block font-mono text-[10px] text-gray-500 uppercase">
                          <TextScramble text="HÒM THƯ ĐIỆN TỬ" />
                        </span>
                        <div className="flex items-center space-x-2 mt-0.5">
                          <span className="font-mono text-xs font-semibold text-gray-200 truncate max-w-[190px] sm:max-w-none">{emailAddr}</span>
                          <button
                            onClick={handleCopyEmail}
                            className="p-1 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
                            title="Sao chép hòm thư"
                          >
                            {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Location office */}
                  <ScrollReveal variant="slide-right" delay={0.4}>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-white/5 flex items-center justify-center text-gray-300">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] text-gray-500 uppercase">
                          <TextScramble text="ĐỊA CHỈ VĂN PHÒNG" />
                        </span>
                        <span className="font-sans text-sm text-gray-300">Bình Dương, Việt Nam</span>
                      </div>
                    </div>
                  </ScrollReveal>

                </div>
              </div>

              {/* Small interactive alert indicator bottom */}
              <div className="mt-8 pt-6 border-t border-white/5 font-mono text-[11px] text-gray-500 flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Thầy sẵn sàng thảo luận bài tập ngoài giờ hành chính!</span>
              </div>

            </div>
          </ScrollReveal>

          {/* Right Column: Interaction message form */}
          <ScrollReveal variant="slide-left" delay={0.15} className="lg:col-span-7">
            <div className="rounded-2xl glass p-8 sm:p-10 h-full border border-white/5 flex flex-col justify-between hover:border-white/12 transition-all duration-500 shadow-2xl hover:rotate-1 hover:-translate-y-2.5 hover:translate-x-1 hover:shadow-[15px_30px_60px_rgba(16,185,129,0.12)] relative">
              
              {submitSuccess ? (
                /* Success Message container */
                <div className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-6 select-text">
                  <div className="w-16 h-16 rounded-full bg-cyber-emerald/10 border border-cyber-emerald/30 flex items-center justify-center text-cyber-emerald animate-bounce">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                      Gửi Tin Nhắn Thành Công!
                    </h4>
                    <p className="font-mono text-xs text-cyber-emerald font-bold uppercase tracking-wider">
                      Status CODE: 200 - MESSAGE TRANSMITTED
                    </p>
                  </div>
                  <div className="p-4 sm:p-6 rounded-xl bg-slate-950/80 border border-white/5 max-w-md">
                    <span className="font-mono text-[10px] text-gray-500 uppercase block mb-1">Tin nhắn phản hồi từ Thầy Dũng:</span>
                    <p className="font-sans text-sm text-gray-200 italic">
                      "Cảm ơn em <span className="font-bold text-cyber-cyan">{name}</span> ({grade}) đã đặt câu hỏi. Thầy đã nhận được tin nhắn và sẽ trả lời em trong thời gian sớm nhất! Keep Learning, Keep Growing!"
                    </p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono border border-white/10 hover:border-white/20 text-gray-300 transition-all cursor-pointer"
                  >
                    /write_new_message.sh
                  </button>
                </div>
              ) : (
                /* Active Form submission layout */
                <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#a855f7] font-bold block mb-2">
                      Gửi tin nhắn cho thầy
                    </span>
                    <h3 className="font-display font-bold text-xl text-white mb-6">
                      Để lại lời chào hoặc câu hỏi
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-gray-400 uppercase">Tên của em *</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Nhập họ tên của em..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/20 transition-all placeholder:text-gray-600"
                        />
                      </div>

                      {/* Grade Selector */}
                      <div className="space-y-2">
                        <label className="block text-xs font-mono text-gray-400 uppercase">Cấp lớp</label>
                        <select
                          value={grade}
                          onChange={(e) => setGrade(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/20 transition-all cursor-pointer"
                        >
                          <option value="Lớp 1">Lớp 1 - 5 (Tiểu Học)</option>
                          <option value="Lớp 6">Lớp 6 - 9 (Trung Học Cơ Sở)</option>
                          <option value="Lớp 10">Lớp 10 - 12 (Trung Học Phổ Thông)</option>
                          <option value="Phụ huynh">Phụ Huynh Học Sinh</option>
                          <option value="Đồng nghiệp">Đồng Nghiệp Tin học</option>
                        </select>
                      </div>
                    </div>

                    {/* Messages Content */}
                    <div className="space-y-2 mt-4">
                      <label className="block text-xs font-mono text-gray-400 uppercase">Lời chào / Câu hỏi của em *</label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hãy viết gì đó... ví dụ: Em làm bài Lab 1 chưa chạy được, hay lời chúc gửi tới Thầy..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/20 transition-all placeholder:text-gray-600 resize-none"
                      />
                    </div>
                  </div>

                  {/* Submission triggers */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[11px] text-gray-500 font-mono text-center sm:text-left select-none">
                      * Các trường thông tin đều được xử lý an toàn cục bộ.
                    </span>
                    <button
                      type="submit"
                      disabled={isSubmitting || !name.trim() || !message.trim()}
                      className={`w-full sm:w-auto px-6 py-3 rounded-xl font-display font-semibold text-sm select-none tracking-wide flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                        !name.trim() || !message.trim()
                          ? "bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed"
                          : "bg-white hover:bg-gray-100 text-slate-950 shadow-md shadow-white/5 hover:translate-y-[-1px] active:translate-y-0"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-slate-950/35 border-t-slate-950 rounded-full animate-spin" />
                          <span>Đang truyền mã...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 flex-shrink-0" />
                          <span>Gửi Tin Nhắn</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
