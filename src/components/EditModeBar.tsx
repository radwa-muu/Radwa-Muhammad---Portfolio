import React, { useState, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Plus, Download, Upload, RotateCcw, Check, X, Sparkles } from 'lucide-react';

export const EditModeBar: React.FC = () => {
  const { isEditMode, setIsEditMode, addCampaign, resetAllData, exportJson, importJson } = usePortfolio();
  const [showAddBrandModal, setShowAddBrandModal] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newBrand, setNewBrand] = useState({
    brandNameEn: '',
    brandNameAr: '',
    campaignEn: '',
    campaignAr: '',
    roleEn: 'Responsible for all of the content.',
    roleAr: 'مسؤولة عن المحتوى بالكامل.',
    brandUrl: '',
  });

  if (!isEditMode) return null;

  const handleCreateBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBrand.brandNameEn.trim() && !newBrand.brandNameAr.trim()) return;
    const id = `brand-${Date.now()}`;
    addCampaign({
      id,
      brandNameEn: newBrand.brandNameEn.trim() || 'NEW BRAND',
      brandNameAr: newBrand.brandNameAr.trim() || 'براند جديد',
      campaignLabelEn: 'The client',
      campaignLabelAr: 'العميل',
      campaignEn: newBrand.campaignEn.trim() || 'Brand campaign description.',
      campaignAr: newBrand.campaignAr.trim() || 'وصف الحملة والمحتوى الخاص بالعلامة.',
      roleLabelEn: 'My role',
      roleLabelAr: 'دوري',
      roleEn: newBrand.roleEn.trim(),
      roleAr: newBrand.roleAr.trim(),
      pageButtonTextEn: 'View the brand page',
      pageButtonTextAr: 'صفحة البراند',
      brandUrl: newBrand.brandUrl.trim() || undefined,
      posts: [
        {
          id: `${id}-post-1`,
          brandId: id,
          dateBadge: 'POST 01 | منشور 01',
          titleEn: 'New Campaign Post',
          titleAr: 'منشور الحملة الأول',
          hookEn: 'Click to edit this post hook in English.',
          hookAr: 'اضغط هنا لتعديل نص المنشور بالعربية.',
          gradientBg: 'from-[#68101C] via-[#380610] to-[#090708]',
          emojiIcon: '✨',
          metaInfoEn: 'Social Media Post',
          metaInfoAr: 'منشور سوشيال ميديا',
        },
      ],
    });
    setNewBrand({
      brandNameEn: '',
      brandNameAr: '',
      campaignEn: '',
      campaignAr: '',
      roleEn: 'Responsible for all of the content.',
      roleAr: 'مسؤولة عن المحتوى بالكامل.',
      brandUrl: '',
    });
    setShowAddBrandModal(false);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') {
        importJson(ev.target.result);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <>
      <div dir="rtl" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-4xl">
        <div className="glass-nav rounded-2xl px-4 py-3 border border-[#8A1526] shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-body-plex text-[#E9DEDE]">
            <Sparkles className="w-4 h-4 text-[#8A1526] shrink-0" />
            <span>
              <strong className="text-white">وضع التعديل مفعّل:</strong> اضغط على أي نص أو صورة لتعديله مباشرة (يُحفظ تلقائياً)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddBrandModal(true)}
              className="px-3 py-1.5 rounded-full bg-[#68101C] hover:bg-[#8A1526] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة براند</span>
            </button>

            <button
              onClick={exportJson}
              className="px-3 py-1.5 rounded-full bg-[#1a050b] hover:bg-[#2a0913] text-[#E9DEDE] text-xs border border-[#8A1526]/40 flex items-center gap-1 cursor-pointer"
              title="حفظ نسخة احتياطية من التعديلات | Export JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تصدير</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-full bg-[#1a050b] hover:bg-[#2a0913] text-[#E9DEDE] text-xs border border-[#8A1526]/40 flex items-center gap-1 cursor-pointer"
              title="استيراد نسخة احتياطية | Import JSON"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>استيراد</span>
            </button>
            <input ref={fileInputRef} type="file" accept=".json,application/json" onChange={handleImportFile} className="hidden" />

            {confirmReset ? (
              <div className="flex items-center gap-1 bg-red-950/80 px-2 py-1 rounded-full border border-red-500/50">
                <button
                  onClick={() => {
                    resetAllData();
                    setConfirmReset(false);
                  }}
                  className="text-[11px] text-red-200 hover:text-white font-bold px-1.5 cursor-pointer"
                >
                  تأكيد الاستعادة
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="text-[11px] text-stone-300 hover:text-white px-1 cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="px-3 py-1.5 rounded-full bg-[#1a050b] hover:bg-[#2a0913] text-[#E9DEDE] text-xs border border-[#8A1526]/40 flex items-center gap-1 cursor-pointer"
                title="استعادة النصوص الأصلية | Reset to defaults"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>استعادة الأصل</span>
              </button>
            )}

            <button
              onClick={() => setIsEditMode(false)}
              className="px-4 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>تم | Done</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Brand / Campaign Modal */}
      {showAddBrandModal && (
        <div
          dir="rtl"
          className="fixed inset-0 z-50 bg-black/88 flex items-center justify-center p-4"
          onClick={() => setShowAddBrandModal(false)}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-[#120306] border border-[#8A1526] p-6 space-y-4 shadow-2xl max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#8A1526]/30 pb-3">
              <h3 className="text-xl font-amiri font-bold text-white">إضافة براند / صفحة عمل جديدة</h3>
              <button
                type="button"
                onClick={() => setShowAddBrandModal(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 cursor-pointer"
                aria-label="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBrand} className="space-y-3 text-sm font-body-plex">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#BDB5B5] mb-1">اسم البراند (إنجليزي)</label>
                  <input
                    type="text"
                    required
                    value={newBrand.brandNameEn}
                    onChange={(e) => setNewBrand({ ...newBrand, brandNameEn: e.target.value })}
                    placeholder="e.g. BRAND NAME"
                    dir="ltr"
                    className="w-full bg-[#090204] border border-[#8A1526]/50 rounded-lg px-3 py-2 text-white outline-none focus:border-[#8A1526]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#BDB5B5] mb-1">اسم البراند (عربي)</label>
                  <input
                    type="text"
                    required
                    value={newBrand.brandNameAr}
                    onChange={(e) => setNewBrand({ ...newBrand, brandNameAr: e.target.value })}
                    placeholder="مثال: اسم العلامة"
                    className="w-full bg-[#090204] border border-[#8A1526]/50 rounded-lg px-3 py-2 text-white outline-none focus:border-[#8A1526]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#BDB5B5] mb-1">وصف البراند / الحملة (إنجليزي)</label>
                <textarea
                  rows={2}
                  dir="ltr"
                  value={newBrand.campaignEn}
                  onChange={(e) => setNewBrand({ ...newBrand, campaignEn: e.target.value })}
                  className="w-full bg-[#090204] border border-[#8A1526]/50 rounded-lg px-3 py-2 text-white outline-none focus:border-[#8A1526]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#BDB5B5] mb-1">وصف البراند / الحملة (عربي)</label>
                <textarea
                  rows={2}
                  value={newBrand.campaignAr}
                  onChange={(e) => setNewBrand({ ...newBrand, campaignAr: e.target.value })}
                  className="w-full bg-[#090204] border border-[#8A1526]/50 rounded-lg px-3 py-2 text-white outline-none focus:border-[#8A1526]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#BDB5B5] mb-1">رابط الصفحة (اختياري)</label>
                <input
                  type="url"
                  dir="ltr"
                  value={newBrand.brandUrl}
                  onChange={(e) => setNewBrand({ ...newBrand, brandUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-[#090204] border border-[#8A1526]/50 rounded-lg px-3 py-2 text-white outline-none focus:border-[#8A1526]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddBrandModal(false)}
                  className="px-4 py-2 rounded-full border border-white/20 text-xs text-stone-300 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#8A1526] hover:bg-[#b81d33] text-white text-xs font-bold cursor-pointer"
                >
                  إضافة للموقع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
