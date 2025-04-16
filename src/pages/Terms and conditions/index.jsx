import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TermsOfUse = () => {
  return (
    <div className="custom-scrollbar">
    <Navbar />
      <div
        id="main-content"
        className="h-full bg-white mb-5 relative overflow-auto dark:text-black"
        style={{ top: "65px" }}
      >
        {/* Hero Section */}
        <section className="bg-white pt-40 flex items-center hero_bg fading_edge p-8 py-24">
          <div className="mx-auto max-w-screen-xl">
            <div className="max-w-2xl mb-8 text-5xl font-bold tracking-tight leading-none text-center">
              <p className="font-DMSerifDisplay-bold tracking-wide">Terms of Use</p>
            </div>

            <p className="font-normal text-gray-900 font-Archivo text-md flex justify-center mb-12">
              <span className="font-normal max-w-2xl text-center">
                We're here to help! Reach us by email at{" "}
                <a
                  href="mailto:team@outsourceapply.com"
                  className="text-blue-600"
                >
                  team@outsourceapply.com
                </a>{" "}
                for any queries or concerns.
              </span>
            </p>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="py-10 bg-white sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="w-full tab-pane max-md:px-4">
                    <h2 className="font-manrope font-bold lg:text-4xl text-3xl text-gray-900 mb-5">Terms of Use</h2>

                    <div className="flex items-center gap-2 lg:mb-10 mb-8">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12.0054 8V12.5322C12.0054 12.8286 12.1369 13.1098 12.3645 13.2998L15 15.5M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z"
                                stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className="font-medium text-lg leading-8 text-indigo-600">Last updated: January 6, 2025</p>
                    </div>


                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">General Terms and Conditions</h1>
                    <p className="text-base text-gray-700 mb-4">Set out below are our general terms and conditions relating
                        to the following:</p>
                    <ul className="list-disc pl-6 mb-4">
                        <li>Your use of this website and its contents.</li>
                        <li>Your use of any information we give you via telephone, text messages, emails, online
                            chatbox, blogs, and social media pages.</li>
                        <li>Any goods or services supplied by us.</li>
                        <li>Any goods or services supplied by a third party via a link or referral from our website or
                            social media pages.</li>
                    </ul>
                    <p className="text-base text-gray-700 mb-6">If you do not agree to be bound by these Terms and
                        conditions, you should discontinue the use of this website and exit immediately.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">We are:</h2>
                    <p className="text-base text-gray-700 mb-4">
                        This Outsource Applications Ltd of 27 Old Gloucester, London WC1N 3A. Our Company registration
                        number is 15943370. We are the owners and operators of this website:
                        <a href="https://www.outsourceapply.com" className="text-blue-600">outsourceapply.com</a>
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">1: Definitions and Interpretation</h2>
                    <p className="text-base text-gray-700 mb-4">In this Agreement, the following terms shall have the
                        following meanings:</p>
                    <div className="mb-4">
                        <p className="font-semibold text-gray-800">Content:</p>
                        <p className="text-base text-gray-700">Means any text, graphics, images, audio, video, software,
                            data compilations, and any other form of information capable of being stored in a computer
                            that appears on or forms part of this Website, our blogs, and our social media pages.</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold text-gray-800">General Terms and Conditions:</p>
                        <p className="text-base text-gray-700">Means these terms and conditions.</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold text-gray-800">Specific Terms and Conditions:</p>
                        <p className="text-base text-gray-700">Means the terms and conditions applying to particular
                            products and services provided by us. Specific terms and conditions take priority over our
                            General Terms and Conditions in the event of any conflict.</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold text-gray-800">Service:</p>
                        <p className="text-base text-gray-700">Means collectively any online facilities, tools, services, or
                            information that Outsource Applications Ltd makes available through the Website, blogs, and
                            social media pages either now or in the future.</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold text-gray-800">System:</p>
                        <p className="text-base text-gray-700">Means any online communications infrastructure that Outsource
                            Applications Ltd makes available through the Website either now or in the future. This
                            includes, but is not limited to, web-based email, message boards, live chat facilities, and
                            email links.</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold text-gray-800">User/Users:</p>
                        <p className="text-base text-gray-700">Means any third party that accesses the Website, blog, and
                            social media pages and is not employed by Outsource Applications Ltd and acting in the
                            course of their employment.</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-semibold text-gray-800">Website:</p>
                        <p className="text-base text-gray-700">Means the website that you are currently using (<a
                                href="https://www.outsourceapply.com"
                                className="text-blue-600">https://www.outsourceapply.com</a>) and any sub-domains of this
                            site unless expressly excluded by their own terms and conditions.</p>
                    </div>

                    <div className="mb-6">
                        <p className="font-semibold text-gray-800">Customer:</p>
                        <p className="text-base text-gray-700">Means an individual, legal person (corporate, partnership, or
                            otherwise), group of people to whom we supply goods and services either ongoing or on a
                            “once only” basis.</p>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Intellectual Property</h2>
                    <p className="text-base text-gray-700 mb-4">The copyright in all content included on the Website, our
                        blogs, and social media pages unless uploaded by users, including, but not limited to, text,
                        graphics, logos, icons, images, sound clips, video clips, data compilations, page layout,
                        underlying code, and software is the property of Outsource Applications Ltd, our affiliates, or
                        other relevant third parties. Trade marks by continuing to use the Website you acknowledge that
                        such material is protected by applicable United Kingdom and International intellectual property
                        and other relevant laws.</p>

                    <p className="text-base text-gray-700 mb-6">Subject to sub-clause 1.3 you may not reproduce, copy,
                        distribute, store or in any other fashion re-use material from the Website unless otherwise
                        indicated on the Website or unless given express written permission to do so by Outsource
                        Applications Ltd. You may view and temporarily store material from the Website, our blogs, and
                        social media pages, in your browser’s cache. You may also print out a single copy for review and
                        non-commercial use.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Links to Other Websites</h2>
                    <p className="text-base text-gray-700 mb-6">This Website, our blogs, and social media pages may contain
                        links to other sites. Unless expressly stated, these sites are not under the control of
                        Outsource Applications Ltd or that of our affiliates. We assume no responsibility for the
                        content of such websites and disclaim liability for any and all forms of loss or damage arising
                        out of the use of them.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Privacy</h2>
                    <p className="text-base text-gray-700 mb-4">Use of the Website is also governed by our GDPR Privacy
                        Policy which can be viewed by following this link.</p>

                    <p className="text-base text-gray-700 mb-6">We take your privacy seriously. We will make every effort to
                        protect your personal data. Accordingly, we will not sell or make your personal details
                        available to any third party without your prior consent.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Cookies</h2>
                    <p className="text-base text-gray-700 mb-6">Our website uses cookies, and you are deemed to consent to
                        the use of cookies by using our website. Cookies are small files of data that are stored on your
                        computer enabling us to give you a better service when you are using our website. You can turn
                        off the use of cookies in your web browser. Information about the cookies used on this website
                        is available on our cookie policy page and can be viewed by following the Cookie policy link.
                    </p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Disclaimers</h2>
                    <p className="text-base text-gray-700 mb-6">Outsource Applications Ltd makes no warranty or
                        representation that the Website, our blogs, and social media pages will meet your requirements,
                        that they will be of satisfactory quality, that they will be fit for a particular purpose, that
                        they will not infringe the rights of third parties, that they will be compatible with all
                        systems, that they will be secure and that all information provided will be accurate.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Limitation of Liability</h2>
                    <p className="text-base text-gray-700 mb-6">To the maximum extent permitted by law, Outsource
                        Applications Ltd accepts no liability for any direct or indirect loss or damage, foreseeable or
                        otherwise, including any indirect, consequential, special or exemplary damages arising from the
                        use of the Website, our blogs, and social media pages or any information contained therein.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Extraordinary and Unforeseeable Events (Force
                        Majeure)</h2>
                    <p className="text-base text-gray-700 mb-6">We shall not be liable for any failure or delay in
                        performing our obligations under these Terms and Conditions where such failure or delay results
                        from any cause that is beyond our reasonable control. Such causes include, but are not limited
                        to: power failure, Internet Service Provider failure, industrial action, civil unrest, fire,
                        flood, storms, earthquakes, acts of terrorism, acts of war, communication failures, computer
                        system failures, governmental action or any other event that is beyond our control.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Opening an Account with Us</h2>
                    <p className="text-base text-gray-700 mb-6">Our website allows you to open an account with us. The
                        account facilitates the administration of your companies and access to services. You are
                        responsible for the security and privacy of that account and for all transactions and activities
                        on that account. Do not disclose your account information to anyone else. In the event that
                        there is a breach of security, you agree to notify us immediately.</p>

                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Prohibiting Your Use of Our Website</h2>
                    <p className="text-base text-gray-700 mb-6">We reserve the right to prohibit your right to access or use
                        our website, blogs, and social media pages at any time and without notice and without disclosing
                        our reason for doing so.</p>


                    <p className="font-semibold text-lg mb-4">Waiver:</p>
                    <p className="mb-6">If any party to these Terms and Conditions fails to exercise any right or remedy
                        contained herein, this shall not be construed as a waiver of that right or remedy.</p>

                    <p className="font-semibold text-lg mb-4">Notices:</p>
                    <p className="mb-6">All notices/communications shall be given to us either by post to our Premises (see
                        address above) or by email to <a href="mailto:team@outsourceapply.com"
                            className="text-blue-600">team@outsourceapply.com</a> etc. Such notice will be deemed received 3
                        days after posting if sent by first className post, the day of sending if the email is received in
                        full on a business day, and on the next business day if the email is sent on a weekend or public
                        holiday.</p>

                    <p className="font-semibold text-lg mb-4">Consumer's right to cancel:</p>
                    <p className="mb-6">Consumers have the right to cancel the contract for the provision of goods or
                        services, by notice in writing, at any time before 14 days have passed from the day after the
                        contract was made. If, however, we have started to perform our side of the contract before you
                        exercise your right to cancel, then the right to cancel is lost.</p>

                    <p className="font-semibold text-lg mb-4">General terms:</p>
                    <p className="mb-6">If this Agreement contains any unlawful provisions not an essential part of this
                        Agreement and which shall not appear to have a controlling or material inducement to the making
                        thereof, such provisions shall be deemed of no effect and shall be deemed stricken from this
                        Agreement without affecting the binding force of the remainder. In the event any provision of
                        this Agreement is capable of more than one interpretation, one which would render the provision
                        invalid and one which would render the provision valid, the provision shall be interpreted so as
                        to render it valid.</p>

                    <p className="font-semibold text-lg mb-4">Law and jurisdiction:</p>
                    <p className="mb-6">These terms and conditions and the relationship between you and Outsource
                        Applications Ltd shall be governed by and construed in accordance with the Law of England and
                        Wales and Outsource Applications Ltd and you agree to submit to the exclusive jurisdiction of
                        the Courts of England and Wales.</p>

                    <p className="font-semibold text-lg mb-4">Outsource Applications Ltd – Specific Terms and Conditions:
                    </p>
                    <p className="mb-6">These specific terms and conditions apply to the goods and services supplied via our
                        website, blogs, and social media pages at <a href="http://www.outsourceapply.com"
                            className="text-blue-600">www.outsourceapply.com</a>. To enter into a transaction with us, you
                        must agree to these terms and conditions in full together with our general terms and conditions.
                    </p>

                    <p className="font-semibold text-lg mb-4">Definitions:</p>
                    <p className="mb-6">
                        <strong>We, us, our and ourselves:</strong> Refers to Outsource Applications Ltd.<br/>
                        <strong>Working day:</strong> Means Monday to Friday excluding public holidays.<br/>
                        <strong>Business Hours:</strong> Means 9 a.m. to 5 p.m.<br/>
                        <strong>Official Post:</strong> Means post from the following government departments: Her
                        Majesty’s Revenue and Customs (HMRC), Companies House, Government Gateway, Department of Works
                        and Pensions (DWP), Office for National Statistics, Information Commissioner's Office (ICO), Her
                        Majesty’s Courts and Tribunal Service, and the Intellectual Property Office.<br/>
                        <strong>Professional Agent:</strong> A third party who acts or advises clients in financial,
                        commercial, and legal matters. Examples are solicitors, accountants, and bookkeepers.
                    </p>

                    <p className="font-semibold text-lg mb-4">Placing an order:</p>
                    <p className="mb-6">When you place an order for any Service or product using this Website, you make an
                        offer to purchase the requested Service or product in accordance with these Terms. This request
                        is subject to acceptance by us, and we reserve the right to decline or refuse any such requests
                        in our sole discretion without providing a reason. If you do not understand our Terms, Services,
                        or products we provide, you should contact us before placing any order.</p>

                    <p className="font-semibold text-lg mb-4">Prices and Payment:</p>
                    <p className="mb-6">Our Website shows our prices excluding VAT. The total purchase price, including VAT
                        chargeable at the applicable rate, will be displayed in your shopping cart prior to confirming
                        the order.</p>
                    <p className="mb-6">We reserve the right to update the prices on our Website and to change, or withdraw
                        any Service we offer and to change our Terms, without prior notice. Every effort is made to
                        ensure that the prices are correct, but in the event of serious error, any transaction shall be
                        voidable by us, and you would then be entitled to a full refund.</p>

                    <p className="font-semibold text-lg mb-4">Non-UK Residents:</p>
                    <p className="mb-6">Prices charged to non-UK residents for company formation with registered offices are
                        higher than the price available to UK residents. This reflects the additional risk and work
                        necessary to comply with MLR regulations. A non-UK resident that pays the reduced price
                        available to UK residents will have to pay the full charge to have his or her MLR documents
                        processed. Any purchases of any service or product by or on behalf of non-UK residents are
                        subject to an additional charge of £18+vat to cover the additional work involved in processing
                        MLR documentation.</p>

                    <p className="font-semibold text-lg mb-4">Professional Agents:</p>
                    <p className="mb-6">Professional agents making applications on behalf of third parties resident in the
                        UK will be subject to an additional charge of £6+vat which is not stated on our website.</p>

                    <p className="font-semibold text-lg mb-4">Information given to Companies House:</p>
                    <p className="mb-6">When you place an order with us, you are authorising us to give information to
                        Companies House so that they can incorporate a new company or update an existing company’s
                        records. Where necessary, this will include personal information relating to the directors and
                        shareholders that you provide us. If you are acting as an agent for a third party, you do so in
                        accordance with clause 4.2 of the general terms and conditions.</p>

                    <p className="font-semibold text-lg mb-4">Continuous Payment Authority:</p>
                    <p className="mb-6">When you make an online payment to us for services, your payment is processed by our
                        secure third-party payment gateway provider. The gateway provider will store your card details
                        securely, without us having access to them. Our systems only retain details of the last 4 digits
                        of your card for reference purposes. The last 4 digits are recorded in the finance section of
                        the online account we give you.</p>

                    <p className="font-semibold text-lg mb-4">Money Laundering Regulations and Prevention of Fraud:</p>
                    <p className="mb-6">We are regulated by the Money Laundering and Terrorist Financing (Amendment)
                        Regulations 2019, London Local Authorities Act 2007, and Know Your Customer (KYC) guidelines.
                        These regulations oblige us to carry out a digital ID verification check to verify your identity
                        and address. We may also ask you to provide us with copies of up-to-date proof of identity and
                        your address. Any documents provided to us will be recorded and copied for audit purposes as
                        part of these requirements.</p>


                    <p className="mb-4">
                        Please note that any searches and copy documents will be securely maintained on our systems
                        against the formed company for your data and papers in pursuance of our data protection policy
                        (Please see our privacy policy). The uses that will be made of the data will be as follows:
                    </p>

                    <ul className="list-disc ml-8 mb-4">
                        <li>To confirm the identity of the person(s) providing it;</li>
                        <li>To verify the directors/shareholders of the company when accessing the service, and</li>
                        <li>To comply with any requests by the regulators and the fraud prevention agencies.</li>
                    </ul>

                    <p className="mb-4">
                        The data will be stored for as long as required by law, which in most cases will be our usual
                        retention period from the end date of the service/agreement. The data will be stored for longer
                        than this if necessary, such as when litigation has arisen or may be pending, checks have or may
                        become relevant in proceedings.
                    </p>

                    <p className="mb-4">
                        Should we not be able to successfully verify your identity and address using our electronic ID
                        verification process, we will require you to provide further proof of your identity and address
                        and/or certified copies of the original documents to satisfy our Anti-Money Laundering
                        procedures. Failure to comply with any request for such documents within set timescales will
                        result in your application being cancelled or an existing service being terminated without a
                        refund.
                    </p>

                    <p className="mb-4">
                        As a Registered Agent Provider, we have a responsibility to carry out due diligence checks from
                        time to time on our customers (companies, officers, and shareholders) to which we provide
                        ongoing services. Should any of our checks result in either the suspicion or the discovery of
                        illegal or unethical activities, we reserve the right to terminate our services without notice
                        and or a refund.
                    </p>

                    <p className="mb-4">
                        Where we are required to carry out International Identity checks for due diligence requirements
                        and to satisfy our AML obligations there will be additional costs for which you will be
                        responsible. The current fee for this International Identity Check will be £13.00 +vat per check
                        per person. This fee is payable by you whether the company formation proceeds to be registered
                        at Companies House or not.
                    </p>

                    <p className="mb-4">
                        You agree for this fee to be charged and taken from your card payment details supplied for the
                        service.
                    </p>

                    <p className="mb-4">
                        If the company formation does not proceed at Companies House (for whatever the reason), you
                        agree and authorise any International Identity Check fees to be deducted from any monies paid to
                        us already for Services.
                    </p>

                    <h2 className="text-lg font-bold mb-4">Limitation of liability</h2>

                    <p className="mb-4">
                        We provide an Online Company Formation Service for different types of companies. For more
                        information about the products and services included in your order, please refer to the
                        applicable company formation pack which may be viewed on this Website. We do not provide legal
                        or accounting advice and it is your responsibility to ensure that you order the Service or
                        combination of services and goods which suits your needs.
                    </p>

                    <p className="mb-4">
                        Forming a limited company requires the submission of information to Companies House, which you
                        provide through our website. It is your responsibility to ensure that the information provided
                        is correct. We do not accept any liability for errors or omission in the information provided to
                        Companies House.
                    </p>

                    <p className="mb-4">
                        We do not accept any liability of whatever nature, if your application is rejected by Companies
                        House because it includes the appointment of a person or persons that do not meet the legal
                        requirements for the incorporation of a company or partnership.
                    </p>

                    <p className="mb-4">
                        It is your responsibility to ensure that any company name you choose may be lawfully used by
                        you. We accept no liability if Companies House accepts a company name that cannot be lawfully
                        used by you.
                    </p>

                    <p className="mb-4">
                        When you select a name for your company registration, we warrant only that we will make an
                        application to the Registrar of Companies for the registration of that name. We do not warrant
                        that Companies House will accept it.
                    </p>

                    <p className="mb-4">
                        We are an online company formation agent and submit your applications to Companies House using a
                        secure electronic filing system. If you have completed our application forms correctly and
                        provided all the information required, Companies House will normally complete your application
                        within 1 working day. All company formation is completed by and subject to Companies House’
                        operating systems. Delay may arise due to Companies House systems failure or other circumstances
                        beyond our control including the provision of incorrect information to us upon placing the
                        order. We do not accept liability for any losses or damages arising from a delay in completing
                        your order.
                    </p>

                    <p className="mb-4">
                        Our liability in respect of all claims arising out of or in connection with your use of this
                        website shall not exceed an amount equal to the sums payable by you to us.
                    </p>

                    <h2 className="text-lg font-bold mb-4">Ordering:</h2>

                    <p className="mb-4">
                        7.1 When placing an order, you will be presented with a choice of products and services. It is
                        your responsibility to ensure that you read the information provided and fully understand the
                        choices before making a purchase. If you require clarification or do not fully understand our
                        product or service, you should contact us during office hours for an explanation. We will
                        endeavour to respond quickly to your enquiry but cannot guarantee to do so in every instance.
                        Regardless of any delay, it remains your responsibility to elicit a response before placing an
                        order.
                    </p>

                    <p className="mb-4">
                        We are regulated by the Money Laundering, Terrorist Financing and Transfer of Funds (Information
                        on the Payer) Regulations 2017 (MLR 2017). By accepting these terms and conditions you are
                        giving us the authority to carry out a digital ID verification check by Credit Safe or other
                        online identification checking system, for the purposes of confirming your identity and address.
                        The check may be recorded on your credit record and a record of the search will be kept by us.
                    </p>

                    <p className="mb-4">
                        If we are unable to verify your identity and address using the online ID database, we will ask
                        you to provide proof of your ID and address by certified copies of your original documents. If
                        you cannot supply certified documents your service will be cancelled. No refunds are given for
                        the cancellation of services arising from the failure to comply with anti-money laundering
                        requirements.
                    </p>

                    <p className="mb-4">
                        Periodically, we are obliged to undertake due diligence checks on the clients to which we
                        provide ongoing services. Should any of our checks result in the discovery of illegal or
                        unethical, we reserve the right to terminate our service, without notice and without a refund.
                    </p>

                    <p className="mb-4">
                        We are obliged to comply with the “Know Your Client” (KYC) regulations and we will ask you to
                        complete a form detailing the nature of your business and the reason for your relationship with
                        us.
                    </p>

                    <h2 className="text-lg font-bold mb-4">Processing and delivery time</h2>

                    <p className="mb-4">
                        We offer a same day formation upgrade to our company formation service. This allows us to “jump
                        the queue” at Companies House by paying them an extra fee. Same day formation requests must be
                        submitted to us by 11am on a working day. The guarantee does not apply if an order is placed
                        after that time. All company formation is completed by and subject to Companies House’s systems.
                        Delay may arise due to Companies House systems failure or other circumstances beyond our control
                        including the provision of incorrect information to us upon placing the order. We do not accept
                        liability for any losses or damages arising from a delay at Companies House and the failure to
                        complete the incorporation within 1 day.
                    </p>

                    <p className="mb-4">
                        Copies of certificates of incorporation and share certificates shall be sent to you by email.
                        Should you request additional copies to be sent by post, we cannot guarantee such documents will
                        arrive to you within a specified period especially since this is subject to Royal Mail delivery
                        times.
                    </p>

                    <p className="mb-4">
                        The prices shown for company formation documents, apostilles, certificates and company seals
                        include free delivery to UK addresses only. We will not post or courier any documents or company
                        seals, outside the UK, unless you have paid our additional postage or courier charges. Our extra
                        postage and courier charges are displayed throughout our website.
                    </p>

                    <h2 className="text-lg font-bold mb-4">Pre-submission review.</h2>

                    <p className="mb-4">
                        This service is offered to ensure that your company formation order is submitted without any
                        obvious errors so that the formation of your company is done without unnecessary delays. It will
                        also ensure that you do not unknowingly make any potentially expensive mistakes. The review does
                        not extend to a review of documents you upload to our website or the spelling of officers'
                        names. You are responsible for ensuring the accuracy and completeness of documents you submit
                        and the proper spelling of names.
                    </p>


                    <p className="mb-4">
                        Our Confidential Post Services are offered as upgrades of our Registered Office and Commercial
                        mail services.
                        Users of our Confidential Post Services, shall have mail re-posted to you to your chosen UK
                        address. This service
                        is not available to non-UK based clients who do not have a UK address to receive their post.
                    </p>
                    <p className="mb-4">
                        We reserve the right at our sole discretion to terminate the Confidential Trade Post Service,
                        without a refund for
                        any unexpired term of the contract, in the event of abuse of the service, for example; by using
                        it as a return address
                        for faulty goods or returns.
                    </p>
                    <p className="mb-4">
                        Whilst every effort will be made to ensure confidential posts are not opened, mistakes can be
                        made. We accept no
                        liability if the post is opened.
                    </p>
                    <p className="mb-4">
                        <strong>Applications to our referral banks and our other referral partners</strong>
                    </p>
                    <p className="mb-4">
                        The Services, products and bank accounts provided by our Referral Partners, are subject to their
                        terms and conditions.
                        Where you request a bank account or service from our Referral Partners you confirm that you
                        agree to be contacted directly
                        by our Referral Partner, for the purposes of fulfilling the service or bank account request.
                    </p>
                    <p className="mb-4">
                        Where you request a bank account or service from a Referral Partner on behalf of a third party
                        for whom you are making
                        a company formation application, you confirm that the third party, the primary contact listed on
                        the company formation
                        application, has agreed to be contacted directly by our Referral Partner, for the purposes of
                        fulfilling the bank account
                        or service request.
                    </p>
                    <p className="mb-4">
                        Once you have completed your incorporation, Outsource Applications Ltd will automatically
                        forward your contact details to our Referral Partner.
                    </p>
                    <p className="mb-4">
                        <strong>VAT registration</strong>
                    </p>
                    <p className="mb-4">
                        We offer a VAT Registration Service, which is non-refundable once the application is made to
                        HMRC. We cannot guarantee
                        that HMRC will accept the application and accept no liability in this event.
                    </p>
                    <p className="mb-4">
                        <strong>Apostilles and certificates of good standing:</strong>
                    </p>
                    <p className="mb-4">
                        The time taken to generate apostilles and certificates of good standing is subject to the time
                        taken by the following third-parties
                        to process our requests: Companies House and HM Foreign Office, Royal mail and third-party
                        courier services. We warrant only
                        that we will respond in reasonable time to all communications that we receive from yourself and
                        the third-parties listed. We
                        accept no liability for any delays in supplying these certificates.
                    </p>
                    <p className="mb-4">
                        <strong>Company restorations</strong>
                    </p>
                    <p className="mb-4">
                        In respect of our company restoration service: The time taken to restore a company is subject to
                        the time taken by the following
                        third-parties to process our requests: Treasury solicitors, Companies House, Royal mail,
                        third-party courier services, HM Courts
                        and Tribunal services and, sometimes, Solicitors for the Duchies of Cornwall and Lancaster. We
                        warrant only that we will respond
                        in reasonable time to all communications that we receive from yourself and the third-parties
                        listed. We accept no liability for
                        any delays in restoring your company.
                    </p>
                    <p className="mb-4">
                        We will not accept company restoration requests requiring a court order for a company subject to
                        Scottish jurisdiction.
                    </p>
                    <p className="mb-4">
                        We will not undertake the restoration of a company that has been subject to a liquidation, is
                        insolvent or subject of a dispute
                        between shareholders, creditors or directors.
                    </p>
                    <p className="mb-4">
                        In the event that you wish to cancel an order once work has begun, no refund will be given.
                    </p>
                    <p className="mb-4">
                        <strong>Community Interest Companies</strong>
                    </p>
                    <p className="mb-4">
                        The formation of a Community Interest Company involves the manual submission of certain
                        documents. The time taken to convert a
                        registered company to a Community Interest Company is therefore subject to the time taken by
                        Companies House. We warrant only
                        that we will submit your documents to Companies House in reasonable time, we do not guarantee
                        the time it will take to register
                        your Community Interest Company.
                    </p>
                    <p className="mb-4">
                        We do not warrant that Companies House will accept your application to register a Community
                        Interest Company. We accept no liability
                        arising from Companies House refusal to register your Community Interest Company.
                    </p>
                    <p className="mb-4">
                        We accept no liability in respect of any delay in the registration of your Community Interest
                        Company.
                    </p>
                    <p className="mb-4">
                        <strong>Trust Pilot:</strong>
                    </p>
                    <p className="mb-4">
                        Trustpilot is a consumer review website which is used by Outsource Applications Ltd to collect
                        customer reviews. Trustpilot invites
                        all our customers to review our service. By agreeing to these terms and conditions, you agree to
                        have your name, email address
                        and order number temporarily shared with TrustPilot, to allow them to send you this invitation.
                        Information given to TrustPilot is
                        not stored and is not shared with anyone else.
                    </p>
                    <p className="mb-4">
                        <strong>Refund policy</strong>
                    </p>
                    <p className="mb-4">
                        <strong>Company Formation Orders:</strong>
                    </p>
                    <p className="mb-4">
                        Refunds for company formation orders where you change your mind and do not wish to proceed with
                        order; Refunds will not be given
                        for the company formation element of an order once the application has been submitted to
                        Companies House.
                    </p>
                    <p className="mb-4">
                        Refunds will not be given for the element of an order relating to the registered office service
                        once the application has been
                        submitted to Companies House.
                    </p>
                    <p className="mb-4">
                        Refunds will not be given for the element of an order that covers third-party costs such as
                        company seals.
                    </p>
                    <p className="mb-4">
                        No refund shall be given for the cancellation order (including any and all elements or parts of
                        an order), resulting from a failure
                        to comply with our Anti-Money Laundering procedures.
                    </p>
                    <p className="mb-4">
                        <strong>Address service orders:</strong>
                    </p>
                    <p className="mb-4">
                        If you order a company address service (registered office, sole trader address, commercial mail/
                        post box service) but change
                        your mind; If we have not already processed your order and set up the service and you have given
                        us notice within 10 working days
                        of the date on which you placed your order, you will be entitled to a full refund of the address
                        service fees.
                    </p>
                    <p className="mb-4">
                        If we have processed your order and set up the service and you have given us notice within 10
                        working days of the date on which
                        you placed your order, you will be entitled to a full refund of the address service fee minus a
                        charge of £12.50+vat to cover our
                        administration costs.
                    </p>
                    <p className="mb-4">
                        You can cancel the address service at any time but no refund will be made.
                    </p>
                    <p className="mb-4">
                        <strong>Telephone service orders:</strong>
                    </p>
                    <p className="mb-4">
                        If you order a telephone service (telephone number and/ or answering service) but change your
                        mind; If we have not already processed
                        your order and set up the service and you have given us notice within 10 working days of the
                        date on which you placed your order,
                        you will be entitled to a full refund of the telephone service fees.
                    </p>
                    <p className="mb-4">
                        If we have processed your order and set up the service and you have given us notice within 10
                        working days of the date on which
                        you placed your order, you will be entitled to a full refund of the telephone service fee minus
                        a charge of £10.00+vat to cover our
                        administration costs.
                    </p>
                    <p className="mb-4">
                        You can cancel the telephone service at any time but no refund will be made.
                    </p>
                    <p className="mb-4">
                        No refund is due to you if we have to cancel any telephone service due to your failure to supply
                        adequate proof of ID and address
                        as required by our terms and conditions.
                    </p>
                    <p className="mb-4">
                        <strong>Additional products and services:</strong>
                    </p>
                    <p className="mb-4">
                        If you place an order for a product or service (such as an apostille or a certificate of good
                        standing) and you change your mind
                        and you notify us within 10 working days of placing your order and we have not started working
                        on your order or placed your order
                        with a third party, you will be due a refund of the fee relating the cancelled element of the
                        order. No refund will be given in
                        any other circumstances.
                    </p>
                    <p className="mb-4">
                        <strong>Incorporation of general terms and conditions:</strong>
                    </p>
                    <p className="mb-4">
                        These general terms and conditions must be read together with the specific terms and conditions
                        above. The General Terms and
                        Conditions apply to any agreement between us and to your use of the website generally.
                    </p>

                </div>
            </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default TermsOfUse;
