import React, { useState } from 'react';
import { X, Shield, FileText, Scale } from 'lucide-react';

export default function LegalModal({ isOpen, onClose, initialTab = 'terms' }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'terms' | 'privacy' | 'tokusho'

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-slate-800">
        {/* モーダルヘッダー */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#D9532F]" />
            <span className="font-bold text-sm sm:text-base text-slate-900">法的情報・各種ポリシー</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* タブ切り替え */}
        <div className="flex border-b border-slate-200 bg-slate-50/50 px-4 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'terms'
                ? 'border-[#D9532F] text-[#D9532F]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>利用規約</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-[#D9532F] text-[#D9532F]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>プライバシーポリシー</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tokusho')}
            className={`py-3 px-4 border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'tokusho'
                ? 'border-[#D9532F] text-[#D9532F]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>特定商取引法に基づく表記</span>
          </button>
        </div>

        {/* モーダルコンテンツ */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-slate-600 bg-white">
          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">fourmulasteps 利用規約</h3>
              <p>
                本利用規約（以下「本規約」）は、fourmulasteps（以下「当サービス」）の利用条件を定めるものです。利用者の皆様は、本規約に同意の上、当サービスをご利用いただきます。
              </p>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">第1条（適用）</h4>
                <p>
                  本規約は、当サービスの提供条件および当サービスの利用に関する当社と利用者との間の権利義務関係を定めることを目的とし、当サービスの利用に関わる一切の関係に適用されます。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">第2条（サービス内容とアカウント）</h4>
                <p>
                  当サービスは、高校数学の解法思考プロセスの解析・学習支援を提供するWebおよびモバイルアプリケーションです。利用者は真実かつ正確な情報を登録し、アカウント情報を適切に管理するものとします。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">第3条（利用料金および支払方法）</h4>
                <p>
                  利用者は、当サービスの有料プランを利用する場合、当サービスが定める利用料金を所定の方法（Stripe決済等）により支払うものとします。契約期間中の解約は随時可能であり、解約後も現在の契約期間満了日までは有料機能をご利用いただけます。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">第4条（禁止事項）</h4>
                <p>
                  利用者は、法令または公序良俗に反する行為、不正アクセス、当サービスの運営を妨害する行為、他者の著作権・知的財産権を侵害する行為を行ってはなりません。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">第5条（免責事項）</h4>
                <p>
                  当サービスはAI技術を用いた解答支援を提供しますが、生成結果の完全性、正確性、特定の試験での合格を保証するものではありません。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">プライバシーポリシー（個人情報保護方針）</h3>
              <p>
                当サービスは、利用者の個人情報の重要性を認識し、個人情報の保護に関する法律等を遵守し、適切な取り扱いと保護に努めます。
              </p>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">1. 取得する情報</h4>
                <p>
                  当サービスは、ユーザー登録時のメールアドレス、氏名、プロフィール情報、およびサービス利用時の学習履歴、画像データ、利用ログを取得します。なお、クレジットカード番号等の決済情報は決済代行会社（Stripe）において安全に処理され、当サービス側で直接保管することはありません。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">2. 情報の利用目的</h4>
                <p>
                  取得した情報は、当サービスの提供・認証、アカウント管理、AI解析機能の提供、カスタマーサポート、サービス改善および機能向上のためにのみ利用します。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">3. 第三者提供の制限</h4>
                <p>
                  法令に基づく場合を除き、利用者の事前の同意なく個人情報を第三者に提供することはありません。
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1">4. 安全管理措置</h4>
                <p>
                  当サービスは、個人情報の漏洩、紛失、改ざんを防止するため、通信の暗号化（SSL/TLS）、適切なアクセス制御を実施します。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'tokusho' && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2">特定商取引法に基づく表記</h3>
              <table className="w-full text-xs text-left border-collapse">
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <th className="py-2.5 pr-4 font-bold text-slate-900 w-1/3">サービス提供事業者</th>
                    <td className="py-2.5">fourmulasteps 運営事務局</td>
                  </tr>
                  <tr>
                    <th className="py-2.5 pr-4 font-bold text-slate-900">運営責任者</th>
                    <td className="py-2.5">西 宏人</td>
                  </tr>
                  <tr>
                    <th className="py-2.5 pr-4 font-bold text-slate-900">所在地</th>
                    <td className="py-2.5">請求があった場合、遅滞なく電磁的記録等にて開示いたします。</td>
                  </tr>
                  <tr>
                    <th className="py-2.5 pr-4 font-bold text-slate-900">連絡先（メール）</th>
                    <td className="py-2.5">support@fourmulasteps.com</td>
                  </tr>
                  <tr>
                    <th className="py-2.5 pr-4 font-bold text-slate-900">販売価格</th>
                    <td className="py-2.5">
                      一般会員: 月額480円（年額4,800円）<br />
                      プレミアム会員: 月額980円（年額9,800円）<br />
                      ※表示価格は消費税込みです。
                    </td>
                  </tr>
                  <tr>
                    <th className="py-2.5 pr-4 font-bold text-slate-900">お支払い方法</th>
                    <td className="py-2.5">クレジットカード決済（Stripe）</td>
                  </tr>
                  <tr>
                    <th className="py-2.5 pr-4 font-bold text-slate-900">役務の提供時期</th>
                    <td className="py-2.5">決済完了後、即座にご利用いただけます。</td>
                  </tr>
                  <tr>
                    <th className="py-2.5 pr-4 font-bold text-slate-900">解約・キャンセルについて</th>
                    <td className="py-2.5">
                      マイページよりいつでもワンクリックで自動更新の解約が可能です。デジタルコンテンツの性質上、決済完了後の返金には応じかねますのでご了承ください。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* モーダルフッター */}
        <div className="p-4 border-t border-slate-200 flex justify-end bg-slate-50/80">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow cursor-pointer"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
}
