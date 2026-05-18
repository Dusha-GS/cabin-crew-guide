import BackButton from "./BackButton";

interface Props { goBack: () => void; previousLabel: string; }

export default function TermsOfServiceSection({ goBack, previousLabel }: Props) {
  const lastUpdated = "1 May 2025";

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        <BackButton onClick={goBack} label={`Back to ${previousLabel}`} />
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-amber-500/30">
            📄 Legal
          </span>
          <h2 className="text-4xl font-bold text-white mb-4">Terms of Service</h2>
          <p className="text-slate-400">Last updated: {lastUpdated}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8 text-slate-300 text-sm leading-relaxed">

          <section>
            <h3 className="text-white font-bold text-lg mb-3">1. Acceptance of Terms</h3>
            <p>By accessing or using the Cabin Crew Interview Guidebook platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. These Terms apply to all visitors, users, and others who access or use the Service.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">2. Description of Service</h3>
            <p>The Cabin Crew Interview Guidebook is an educational platform providing preparation resources, AI-powered mock interviews, CV review tools, and community forum access for individuals seeking cabin crew positions at Middle Eastern airlines. The Service includes both free and premium paid features.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">3. User Eligibility</h3>
            <p>You must be at least 18 years of age to use this Service. By using the Service, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">4. Premium Membership & Payments</h3>
            <p className="mb-3">Certain features of the Service require a paid Premium membership ("Premium"). By purchasing a Premium membership, you agree to the following:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Premium access is granted upon successful payment processing via our third-party payment provider (Whop).</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Payments are processed in USD. Applicable taxes may apply based on your jurisdiction.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Premium memberships are non-transferable and for personal use only.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Refunds are available within 24 hours of purchase. After 24 hours, all sales are final.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We reserve the right to modify Premium features with reasonable notice to members.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">5. AI-Generated Content Disclaimer</h3>
            <p className="mb-3">The Service uses artificial intelligence (Claude by Anthropic) to generate interview feedback, CV reviews, and forum responses. You acknowledge and agree that:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> AI-generated content is for educational and preparation purposes only and does not constitute professional career advice.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We do not guarantee employment outcomes or interview success.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> AI responses may occasionally contain inaccuracies. Always verify information directly with the relevant airline.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> The Service is not affiliated with, endorsed by, or officially connected to Emirates, Etihad Airways, Qatar Airways, flydubai, Air Arabia, or any other airline.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">6. User Conduct & Community Standards</h3>
            <p className="mb-3">When using the forum and community features, you agree not to:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Post content that is offensive, discriminatory, harassing, or harmful to others.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Share your Premium login credentials or provide access to unauthorized users.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Reproduce, distribute, or resell any content from the Service without written permission.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Post spam, advertisements, or solicitations in the forum.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Impersonate airline recruiters, crew members, or other users.</li>
            </ul>
            <p className="mt-3">Violation of these standards may result in immediate termination of your membership without refund.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">7. Intellectual Property</h3>
            <p>All content on the Service, including text, graphics, guides, interview questions, and AI-generated materials, is the intellectual property of Cabin Crew Interview Guidebook. You may not copy, reproduce, distribute, or create derivative works without our express written consent. Your personal CV content submitted for review remains your own property.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">8. Privacy & Data</h3>
            <p>Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to the collection and use of your information as described in our Privacy Policy. CV content submitted for AI review is processed by Anthropic's API and is not stored on our servers beyond the duration of your session.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">9. Disclaimers & Limitation of Liability</h3>
            <p className="mb-3">The Service is provided on an "as is" and "as available" basis without warranties of any kind. To the fullest extent permitted by applicable law:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We disclaim all warranties, express or implied, including merchantability and fitness for a particular purpose.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> We are not liable for any indirect, incidental, or consequential damages arising from your use of the Service.</li>
              <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">◆</span> Our total liability shall not exceed the amount you paid for Premium membership in the 12 months preceding the claim.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">10. Governing Law</h3>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE. For users in other Middle Eastern jurisdictions, we comply with applicable local consumer protection laws.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">11. Changes to Terms</h3>
            <p>We reserve the right to modify these Terms at any time. We will notify users of material changes by updating the "Last updated" date and, where appropriate, by email notification. Your continued use of the Service after changes constitutes acceptance of the new Terms.</p>
          </section>

          <section>
            <h3 className="text-white font-bold text-lg mb-3">12. Contact</h3>
            <p>For questions about these Terms, please contact us at <a href="mailto:support@cabincrewguidebook.com" className="text-amber-400 hover:underline">support@cabincrewguidebook.com</a>. We aim to respond within 2 business days.</p>
          </section>

        </div>
      </div>
    </div>
  );
}
