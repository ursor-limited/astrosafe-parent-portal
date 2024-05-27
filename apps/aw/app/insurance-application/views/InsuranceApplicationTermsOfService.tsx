import { AWButton } from "@/components/AWButton";
import InsuranceApplicationDialog, {
  dmMono,
} from "../InsuranceApplicationDialog";
import { useState } from "react";
import { AWCheckbox } from "@/components/AWCheckbox";

interface IAWTermsOfServiceSection {
  title?: string;
  paragraphs: string[];
}

const TOS: IAWTermsOfServiceSection[] = [
  {
    title: "1. Acceptance of Terms of Service",
    paragraphs: [
      `These Terms of Service are a binding contract between you and Anchorwatch. By registering for and/or using the Services in any manner, including but not limited to visiting or browsing the Site or downloading one or both of the Apps, you agree to and accept these Terms of Service and all other rules, policies and procedures that may be published from time to time on the Site or such Apps by us, each of which is incorporated by reference and each of which may be updated from time to time.`,

      `These Terms of Service apply to all users of the Services, registered or otherwise. Certain of the Services may be subject to additional terms and conditions specified by us from time to time; your use of such Services is subject to those additional terms and conditions, which are incorporated into these Terms of Service by reference. For example, additional terms and conditions may apply to you if you have purchased Insurance (as defined below); any such terms and conditions are hereby deemed a part of these Terms of Service.`,

      `We are constantly trying to improve our Services, and may need to change these Terms of Service. We reserve the right to change the Terms of Service at any time, in our sole discretion, but if we do, we will bring it to your attention by placing a notice on the Site and/or sending you electronic mail. If you don’t agree with the new Terms of Service, you are free to reject them; however, that means you will no longer be able to use the Services. If you use the Services in any way after a change to the Terms is effective, that means you agree to all of the changes.`,

      `If you are using the Services on behalf of a company, entity, or organization, then you represent and warrant that you are an authorized representative of that company, entity, or organization with the authority to bind such organization to these Terms, and agree to be bound by these Terms on behalf of such company, entity, or organization.`,

      `PLEASE NOTE: These Terms of Service cover important information about the Services and any charges, taxes, and fees that we bill you, and include information about automatic renewals, limitations of liability, a class action waiver, and resolution of disputes by arbitration instead of in court. EXCEPT FOR CERTAIN TYPES OF DISPUTES DESCRIBED IN THE ARBITRATION SECTION BELOW, YOU AGREE THAT DISPUTES BETWEEN YOU AND US WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE IN A CLASS ACTION LAWSUIT OR CLASS-WIDE ARBITRATION.`,
    ],
  },
  {
    title: "2. About Anchorwatch and the Services",
    paragraphs: [
      `The Services comprise Bitcoin multi-signature cold storage wallets, designated as Trident Vaults (each, a “Vault”), facilitating the storage of Bitcoin. These Vaults permit you, as well as third parties selected or approved by Anchorwatch (the “Partner Institutions”), and Anchorwatch, to hold Private Keys, construct bitcoin transactions, coordinate the construction and signing of transactions,  aggregate partially signed transactions, and broadcast final transactions to the Bitcoin Network. For the purposes of this agreement, "Private Keys" are defined as a secret number, which can be represented in alphanumeric form, that is secured by a Signing Device. It is used to provide Transaction Signatures for a specific bitcoin address. A “Transaction Signature” is a digital proof that a transaction has been authorized by a Signing Device associated with a specific bitcoin address. A “Signing Device” is a dedicated device which stores and manages the Private Key material associated with your Vault. “Approved Signing Devices” are limited to the Ledger Bitcoin hardware wallet, although Anchorwatch reserves the right to amend this definition to include additional devices as it sees fit. Signing Devices require a Signing Device PIN to access and require that you verify the amount of Bitcoin being sent and the destination where Bitcoin is being sent in a Transaction. A “Signing Device Pin” is a secure numerical code used to authenticate access to a Signing Device. The authorization of transactions from a Vault requires a subset of Approved Signing Devices, the composition of which may be subject to alteration over time to accommodate scenarios such as the loss of one or more Private Keys or the passage of time such as the expiration of an Insurance contract. The configuration of each Vault, determined at the sole discretion of Anchorwatch, permits a variable subset of Approved Signing Devices to authorize transactions. As of the date of this agreement, Use of the Services is also conditioned on purchasing insurance from Anchorwatch (the “Insurance”) that is subject to the separate terms and services detailed in the insurance contract (the “Insurance Contract”) which is incorporated herein by reference. The Services are not an exchange for buying, selling, or trading digital or virtual currency or assets (an “Exchange”), and Anchorwatch is not a bank or other financial institution. BY USING THE SERVICES IN ANY MANNER, YOU ACKNOWLEDGE AND AGREE THAT (A) ANCHORWATCH IS NOT IN THE BUSINESS OF PROVIDING FINANCIAL, LEGAL, TAX, ACCOUNTING, OR INVESTMENT ADVICE OR SERVICES, AND (B) NONE OF THE SERVICES ARE INTENDED TO PROVIDE OR CONTAIN ANY SUCH ADVICE OR SERVICES. Anchorwatch urges you to consult a qualified professional for any such advice or service.`,
    ],
  },
  {
    title: "3. Eligibility",
    paragraphs: [
      `You must be at least 18 years of age to use the Services and have passed our KYC (Know Your Customer) verification process. If you are under age 18, you may not, under any circumstances or for any reason, use the Services. We may, in our sole discretion, refuse to offer the Services to any person or entity and change its eligibility criteria at any time. You are solely responsible for ensuring that these Terms of Service are in compliance with all laws, rules and regulations applicable to you and the right to access the Services is revoked where these Terms of Service or use of the Services is prohibited or to the extent offering, sale or provision of the Services conflicts with any applicable law, rule or regulation. Further, the Services are offered only for your own use, and not for the use or benefit of any third party.
      
      4. Account Registration
      To access the Services, you will be required to register for an account on the Services (an “Account”) and undergo a KYC verification process. To register an Account and complete the KYC process, you will be required to enter and verify personal information such as your first name, last name, email address, and additional documentation as required for identity verification purposes (collectively, “Account Information”). You promise to provide us with accurate, complete, and updated Account Information about yourself and/or the company, entity, or organization you represent. You are solely responsible for the activity that occurs on your Account, and for keeping your Account Information secure. You should never publish, distribute, or post login information for your Account. You may not use Account Information that you don’t have the right to use, or with the intent to impersonate another person. You must notify us immediately of any change in your eligibility to use the Services (including any changes to or revocation of any licenses from state authorities), breach of security, or unauthorized use of your Account. You may not transfer your Account to anyone else without our prior written permission. You shall have the ability to delete your Account, either directly or through a request made to one of our employees.
      
      5. Use of the Services
      Content. For purposes of these Terms of Service, the term “Content” includes, without limitation, information, data, text, photographs, videos, audio clips, written posts and comments, software, scripts, graphics, and interactive features generated, provided, or otherwise made accessible on or through the Services.
      
      Notices and Restrictions. The Services’ entire contents, features, and functionality (including but not limited to all Content) are owned by Anchorwatch, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws. You shall abide by and maintain all copyright notices, information, and restrictions contained in any Content accessed through the Services. Any unauthorized use of any Content or materials in the Services is strictly prohibited and may violate copyright and trademark laws, and/or the laws of privacy, publicity, and/or communications regulations and statutes.
      
      Use License. Subject to these Terms of Service, we grant each user of the Services a revocable, worldwide, non-exclusive, non-sublicensable and non-transferable license to use the Services and the Content solely for personal or internal business purposes and only in accordance with these Terms of Service. Use, reproduction, modification, distribution or storage of any Services or Content for any other purpose is expressly prohibited without prior written permission from us. You shall not sell, license, rent, or otherwise use or exploit any Services or Content for commercial use or in any way that violates any third party right; provided that, for the avoidance of doubt, if you are an entity, you may use the Services solely for internal business purposes in accordance with these Terms. 
      
      License Grant. Subject to the terms and conditions of this Agreement, you hereby do and shall grant Anchorwatch a worldwide, non-exclusive, non-sublicensable (except for the purposes provided herein), royalty-free license to access and use your Account Information and any other information you provide us solely for the purpose of providing you the Services. Further, you hereby do and shall consent to Anchorwatch’s collection, storage, and use of personally identifiable information, and to the transfer and hosting of such data on Anchorwatch's servers located in the United States and elsewhere in the world, in accordance with the foregoing license grant. 
      
      Availability of Content. We do not guarantee that any Content will be made available on the Site or through the Services. We reserve the right to, but do not have any obligation to, (i) remove, edit or modify any Content in our sole discretion, at any time, without notice to you and for any reason (including, but not limited to, upon receipt of claims or allegations from third parties or authorities relating to such Content or if we are concerned that you may have violated these Terms of Service), or for no reason at all and (ii) to remove or block any Content from the Services.
      
      Private Keys. You hereby agree to strictly safeguard all private cryptographic keys, which shall be stored and managed exclusively through Authorized Signing Devices. You are required to comply with stringent security measures and protocols as prescribed by Anchorwatch or Ledger, designed to prevent unauthorized access, loss, or misappropriation of the cryptographic keys contained within these devices. It is expressly understood that Anchorwatch's liability for any loss or mishandling of cryptographic keys shall be limited solely to those keys under its direct control within specified configurations of the Vaults as specified in your Insurance Policy. Responsibility for the security of cryptographic keys stored on Authorized Signing Devices outside of Anchorwatch's immediate purview shall rest entirely with you and the Partner Institutions. In the occurrence of any security breach or suspicion of unauthorized use of the cryptographic keys on Authorized Signing Devices, you shall be obliged to notify Anchorwatch without undue delay. Such notification shall enable Anchorwatch to take necessary and immediate remedial actions and will require your full and unfettered cooperation with Anchorwatch and any investigations undertaken by it or on its behalf. 
      
      Loss of Private Keys. Subject to the configuration of the designated Vault, the loss of one or more Private Keys by you or others may result in varied authorization protocols for transactions (the “Recovery Protocols”). These protocols include, but are not limited to: (1) the allowance for transactions to be authorized with a reduced number of Private Keys, contingent upon any necessary authorization from Partner Institutions and/or Anchorwatch; or (2) the authorization from Partner Institutions and Anchorwatch alone. The Recovery Protocols may change from time to time and will be determined in the absolute discretion of Anchorwatch alone. Notwithstanding the foregoing, Anchorwatch shall bear no liability for any losses incurred as a result of the loss of Private Keys by you or Partner Institutions, or any actions or inactions by You or any Partner Institutions, except as expressly provided for in the Insurance Contract.
      
      Recovery Keys. In addition to your Private Keys, you will be given “Recovery Keys” which after termination of the Insurance Contract will enable you to unilaterally transfer Bitcoin from the Vault(s).
      
      Third Party Services. In connection with the Services, Anchorwatch may use, or may provide you with access to, hardware devices, software, source code or other technology licensed to Anchorwatch from third parties, and which may be owned by such third parties (collectively, “Third Party Materials”). You acknowledge and agree that Anchorwatch does not make any warranties or guarantees regarding Third Party Materials and is not responsible for the operation or failure of any Third Party Materials, including without limitation the privacy practices, data security processes or other aspects related to Third Party Materials. You further acknowledge and agree that any Authorized Signing Devices are each subject to their own terms and conditions separate and apart from this Agreement. You agree to waive any claim against Anchorwatch with respect to such Third Party Materials and release Anchorwatch from any associated liability.
      
      6. Restrictions on Use
      As a condition of use, you promise not to use the Services for any purpose that is prohibited by these Terms of Service. You are responsible for all of your activity in connection with the Services. You shall not (and shall not permit any third party to) either (a) take any action or (b) upload, download, post, submit or otherwise distribute or facilitate distribution of any Content on or through the Service that:
      1. infringes any patent, trademark, trade secret, copyright, right of publicity or other right of any other person or entity or violates any law or contractual duty;
      2. you know is false, misleading, untruthful or inaccurate;
      3. is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive of another’s privacy, tortious, obscene, vulgar, pornographic, offensive, profane, contains or depicts nudity, contains or depicts sexual activity, or is otherwise inappropriate as determined by us in our sole discretion;
      4. constitutes unauthorized or unsolicited advertising, junk or bulk e-mail (“spamming”);
      5. contains software viruses or any other computer codes, files, or programs that are designed or intended to disrupt, damage, limit or interfere with the proper function of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any system, data, password or other information of ours or of any third party;
      6. impersonates any person or entity, including any of our employees or representatives; or
      7. includes anyone’s identification documents or sensitive financial information.
      You shall not: (i) take any action that imposes or may impose (as determined by us in our sole discretion) an unreasonable or disproportionately large load on our (or our third party providers’) infrastructure; (ii) interfere or attempt to interfere with the proper working of the Services or any activities conducted on the Services; (iii) bypass, circumvent or attempt to bypass or circumvent any measures we may use to prevent or restrict access to the Services (or other accounts, computer systems or networks connected to the Services); (iv) run any form of auto-responder or “spam” on the Services; (v) use manual or automated software, devices, or other processes to “crawl” or “spider” any page of the Site; (vi) harvest or scrape any Content from the Services; or (vii) otherwise take any action in violation of our guidelines and policies.
      You shall not (directly or indirectly): (i) decipher, decompile, disassemble, reverse engineer or otherwise attempt to derive any source code or underlying ideas or algorithms of any part of the Services (including without limitation any application), except to the limited extent applicable laws specifically prohibit such restriction, (ii) modify, translate, or otherwise create derivative works of any part of the Services, or (iii) copy, rent, lease, distribute, or otherwise transfer any of the rights that you receive hereunder. You shall abide by all applicable local, state, national and international laws and regulations.
      Certain Services may be subject to applicable United States export laws and regulations. You shall comply with all export laws and restrictions and regulations of the Department of Commerce, the United States Department of Treasury Office of Foreign Assets Control (“OFAC”), or other United States or foreign agency or authority, and you shall not export, or allow the export or re-export of any software in violation of any such restrictions, laws or regulations. By downloading or using the App or any other Services, you agree to the foregoing and represent and warrant that you are not located in, under the control of, or a national or resident of any United States-embargoed or restricted country.
      We also reserve the right to access, read, preserve, and disclose any information as we believe is necessary to (i) satisfy any applicable law, regulation, legal process or governmental request, (ii) enforce these Terms of Service, including investigation of potential violations hereof, (iii) detect, prevent, or otherwise address fraud, security or technical issues, (iv) respond to user support requests, or (v) protect the rights, property or safety of us, our users and the public.
      
      7. Third Party Services
      The Services may permit or enable you to interact with other websites, services or resources on the internet or other mobile applications (“Third Party Services”), and other Third Party Services may contain, interact or integrate with the Services. When you access Third Party Services on the internet, you do so at your own risk. These Third Party Services are not under our control, and you acknowledge that we are not responsible or liable for the content, functions, accuracy, legality, appropriateness or any other aspect of such Third Party Services. The inclusion of any such link does not imply our endorsement or any association between us and their operators. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any Third Party Services.
      
      8. Payments and Billing
      In accordance with the Terms, you shall incur a fee amounting to 0.25% of the value of the Bitcoin subject to the Insurance Contract  and deposited within one or more Vaults on an annual basis. This fee is in addition to any premiums or other fees stipulated within the Insurance Contract. Such fee shall be due and payable at the time of executing the Insurance Contract and subsequently on an annual basis, coinciding with the anniversaries of the Insurance Contract's inception. The collection of this fee shall be effected either through the automatic transfer of the corresponding Bitcoin amount from the Vault or by billing you directly. Should the fee be collected through direct billing, you are obligated to settle the amount within thirty (30) days from the date of invoice. Failure to remit payment within this period may result in interest charges on the overdue amount at the rate of 1.5% per month or the maximum rate permitted by law, whichever is lower, until full payment is received. You have the option to fulfill this payment obligation in either US dollars or Bitcoin. Should you opt to pay in US dollars, the exchange rate applicable shall be the rate prevailing on the date the Insurance Contract was initially entered into, or the relevant anniversary thereof for subsequent payments. This ensures that the payment amount reflects the accurate value of the Bitcoin subject to the Insurance Contract at the time of payment.
      
      9. Products
      Product Descriptions and Availability. Descriptions, images, references, features, content, specifications, products, prices, and availability of any Products made available through the Services are subject to change without notice. The inclusion of any Products on the Services at a particular time does not imply or warrant that these products will be available at any time. We reserve the right, with or without prior notice, to limit the available quantity of or discontinue any Product on the Services; to bar any user from making any or all purchases; or to refuse to provide any user with any product.
      
      Pricing. Prices and fees do not include any taxes, which will be noted in the payment terms presented to you during the checkout process.
      
      Your Legal Obligations. It is your responsibility to ascertain and obey all applicable local, state, federal, and international laws (including minimum age requirements) in regard to the possession, use, and sale of any Product purchased through the Services. By placing an order, you represent that the Products ordered will be used only in a lawful manner.
      Returns, Refunds, and Fees. Please review our policy here, which are incorporated into these Terms of Service by reference.
      
      Customer Service. If you have any questions about a particular Product, or you have questions about shipping, returns, or refunds, please contact us at [insert].
      
      10.  Account Access by Third Parties
      Anchorwatch will grant third parties access to your Account as follows:
      In the event of your death (or dissolution in the case of a legal entity), Anchorwatch will: Grant access to your Account including your Recovery Key to the person (the “Recovery Custodian”) you designate in the Application using the email address set forth in the Application, provided that the Recovery Custodian (i) provides Anchorwatch with a certified copy of your death certificate and photo identification bearing a name that matches the name of the Recovery Custodian in your Application; and (ii) verifies the email address in your Application pursuant to Anchorwatch's procedures for verification; and transfer the Anchorwatch account to the Recovery Custodian and assist in recovering the Bitcoin if they are able to provide the necessary items in the previously assembled inheritance envelope.
      We will grant access to an agent acting pursuant to a valid power of attorney executed by you, provided that such agent provides all information required by Anchorwatch, which may include (i) a request for access to your account from the agent in writing; (ii) an original of the power of attorney that gives the agent specific authority over your Anchorwatch account or general authority to act on your behalf; (iii) a certification by the agent, under penalty of perjury, that the power of attorney is in effect; (iv) verification of Anchorwatch account information by the agent, and (v) such other information required by Anchorwatch to grant access to the agent; and provided further, that Anchorwatch may require your agent to pay Anchorwatch fees for such access.
      You may change your Recovery Custodian at any time. It is your sole responsibility to ensure that the Recovery Custodian is a person whom you wish to have access and control of your Account in the event of your death, and Anchorwatch shall have no liability to you or any person or entity for any actions taken by the Recovery Custodian with respect to your Account, Recovery Key, bitcoin and/or Vaults. You agree to indemnify and hold Anchorwatch harmless from any and all losses, damages, liabilities, deficiencies, actions, judgments, interest, awards, penalties, fines, costs, or expenses of whatever kind, including reasonable attorneys' fees and the cost of enforcing any right to indemnification hereunder and the cost of pursuing any insurance providers which Anchorwatch may incur as a result of Anchorwatch's reliance upon instructions from you, including but not limited to your instructions as to the Recovery Custodian in the Inheritance Application. This Section 10 shall be binding on your Recovery Custodians, executors, administrators, heirs, and assigns. At the current time, our Inheritance Program is available exclusively for individuals and is not available for corporate, company or other entity clients.
      For the avoidance of doubt, in the event of a dispute over which third parties are entitled to the Recovery Keys, Anchorwatch shall have unfettered discretion to make such determination and will in no event be liable for such decision.
      This Section 10 shall be binding on your executors, administrators, heirs, and assigns.
      
      11. Termination
      Subject to the Insurance Contract, we may terminate your access to all or any part of the Services at any time, with or without cause, with notice by email, effective immediately, which may result in the forfeiture and destruction of all information associated with your membership. Subject to the Insurance Contract if you wish to terminate your Account, you may do so by following the instructions on the Site or through the Services. Any fees paid hereunder are non-refundable. All provisions of these Terms of Service which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
      
      12. iOS Terms
      iOS Terms. As mentioned above, these Terms of Service apply to your use of all the Services, including the Apps for iOS available via the Apple, Inc. (“Apple”) App Store (each an “iOS App”), but the following additional terms also apply to the iOS Apps:
      Both you and Anchorwatch acknowledge that the Terms are concluded between you and Anchorwatch only, and not with Apple, and that Apple is not responsible for the App or the Content;
      If you are a natural person, the App is licensed to you on a limited, non-exclusive, non-transferrable, non-sublicensable basis, solely to be used in connection with the Services for your private, personal, non-commercial use, subject to all the terms and conditions of these Terms as they are applicable to the Services;
      If you are an entity, the App is licensed to your entity on a limited, non-exclusive, non-transferrable, non-sublicensable basis, solely to be used in connection with the Services for your entity’s internal use, subject to all the terms and conditions of these Terms as they are applicable to the Services;
      You will only use the App in connection with an Apple device that you own or control;
      You acknowledge and agree that Apple has no obligation whatsoever to furnish any maintenance and support services with respect to the App;
      In the event of any failure of the App to conform to any applicable warranty, including those implied by law, you may notify Apple of such failure; upon notification, Apple’s sole warranty obligation to you will be to refund to you the purchase price, if any, of the Application;
      You acknowledge and agree that Anchorwatch, and not Apple, is responsible for addressing any claims you or any third party may have in relation to the App;
      You acknowledge and agree that, in the event of any third party claim that the App or your possession and use of the Application infringes that third party’s intellectual property rights, Anchorwatch, and not Apple, will be responsible for the investigation, defense, settlement and discharge of any such infringement claim;
      You represent and warrant that you are not located in a country subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a “terrorist supporting” country, and that you are not listed on any U.S. Government list of prohibited or restricted parties;
      Both you and Anchorwatch acknowledge and agree that, in your use of the App, you will comply with any applicable third party terms of agreement which may affect or be affected by such use; and
      Both you and Anchorwatch acknowledge and agree that Apple and Apple’s subsidiaries are third party beneficiaries of these Terms of Service, and that upon your acceptance of these Terms of Service, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms against you as the third party beneficiary hereof.
      
      13. Warranty Disclaimer
      Except as provided in the Insurance Contract, Anchorwatch has no special relationship with or fiduciary duty to you. You acknowledge that Anchorwatch has no duty to take any action regarding:
               1. which users gain access to the Services;
               2. what Content you access via the Services; or
               3. how you may interpret or use the Content.
      You acknowledge that Bitcoin, and platforms and marketplaces for the same, involve significant financial, legal, and other risks (collectively, “Risks”). You further acknowledge and agree that (a) you are solely responsible for learning about such Risks; (b) Anchorwatch shall have no responsibility to alert you about any Risks; and (c) any information relating to Bitcoin, platforms and marketplaces for same, and Risks that are provided by Anchorwatch or its representatives in connection with the Services is for informational purposes only, and shall under no circumstances be construed as advice or direction of any kind.
      You release us from all liability for you having acquired or not acquired Content through the Services. We make no representations concerning any Content contained in or accessed through the Services, and we will not be responsible or liable for the accuracy, copyright compliance, or legality of material or Content contained in or accessed through the Services.
      SUBJECT TO THE INSURANCE CONTRACT, THE SERVICES AND CONTENT ARE PROVIDED “AS IS”, “AS AVAILABLE” AND WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, AND ANY WARRANTIES IMPLIED BY ANY COURSE OF PERFORMANCE OR USAGE OF TRADE, ALL OF WHICH ARE EXPRESSLY DISCLAIMED. WE, AND OUR DIRECTORS, EMPLOYEES, AGENTS, SUPPLIERS, PARTNERS AND CONTENT PROVIDERS DO NOT WARRANT THAT: (I) THE SERVICES WILL BE SECURE OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (II) ANY DEFECTS OR ERRORS WILL BE CORRECTED; (III) ANY CONTENT OR SOFTWARE AVAILABLE AT OR THROUGH THE SERVICES IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (IV) THE RESULTS OF USING THE SERVICES WILL MEET YOUR REQUIREMENTS. YOUR USE OF THE SERVICES IS SOLELY AT YOUR OWN RISK.
      THE INSURANCE PURCHASED FROM US IS COVERED BY AN INSURANCE CONTRACT. ANY AND ALL WARRANTIES CONTAINED IN THE INSURANCE CONTRACT ARE INCORPORATED BY REFERENCE INTO THESE TERMS OF SERVICE. TO THE EXTENT THERE IS A CONFLICT BETWEEN THE TERMS OF THE INSURANCE CONTRACT AND THESE TERMS OF SERVICE, THE TERMS OF THE INSURANCE CONTRACT WILL GOVERN WITH RESPECT TO ANCHORWATCH SERVICES. 
      THIRD PARTY PRODUCTS PURCHASED BY YOU THROUGH THE SERVICES ARE NOT OUR PRODUCTS, AND WE DISCLAIM ANY AND ALL WARRANTIES RELATED TO SUCH THIRD PARTY PRODUCTS. EACH THIRD PARTY PRODUCT PROVIDER IS FULLY RESPONSIBLE FOR THE THIRD PARTY PRODUCTS SOLD THROUGH THE SERVICES. YOU WAIVE AND RELEASE US FROM ANY AND ALL INJURIES, DAMAGES, CLAIMS, LIABILITIES, AND COSTS SUCH THIRD PARTY PRODUCTS MAY CAUSE YOU TO SUFFER ARISING FROM OR RELATED TO ANY ACT OR OMISSION OF ANY THIRD PARTY PRODUCT PROVIDER IN CONNECTION WITH SUCH PROVIDER’S THIRD PARTY PRODUCTS. WE ARE NOT RESPONSIBLE FOR EXAMINING OR EVALUATING, AND WE DO NOT WARRANT THE OFFERINGS OF ANY THIRD PARTY OR THIRD PARTY PRODUCTS. WE DO NOT ASSUME ANY RESPONSIBILITY OR LIABILITY FOR THE ACTIONS, PRODUCTS AND CONTENT OF THIRD PARTY PRODUCT PROVIDERS OR ANY OTHER THIRD PARTIES. YOUR PURCHASE AND USE OF THIRD PARTY PRODUCTS IS SOLELY AT YOUR OWN RISK.
      
      14. Indemnification
      Except as provided in the Insurance Contract, you shall defend, indemnify, and hold harmless us, our affiliates and each of our and their respective employees, contractors, directors, suppliers and representatives from any and all liabilities, claims, and expenses, including reasonable attorneys’ fees, that arise from or relate to your use or misuse of, or access to, the Services, Content, or Anchorwatch Products, or otherwise from your submitted Content, violation of these Terms of Service, or infringement by you, or any third party using your Account or identity in the Services, of any intellectual property or other right of any person or entity. We reserve the right to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, in which event you will assist and cooperate with us in asserting any available defenses.
      
      15. Limitation of Liability
      EXCEPT AS PROVIDED IN THE INSURANCE CONTRACT, TO THE FULLEST EXTENT ALLOWED BY APPLICABLE LAW, IN NO EVENT SHALL WE, NOR OUR DIRECTORS, EMPLOYEES, AGENTS, PARTNERS, SUPPLIERS OR CONTENT PROVIDERS, BE LIABLE UNDER CONTRACT, TORT, STRICT LIABILITY, PRODUCT LIABILITY, NEGLIGENCE OR ANY OTHER LEGAL OR EQUITABLE THEORY WITH RESPECT TO THE SERVICES OR PRODUCTS (I) FOR ANY LOST PROFITS, DATA LOSS, COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES, OR SPECIAL, INDIRECT, INCIDENTAL, PUNITIVE, COMPENSATORY OR CONSEQUENTIAL DAMAGES OF ANY KIND WHATSOEVER (HOWEVER ARISING), (II) FOR ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE (REGARDLESS OF THE SOURCE OF ORIGINATION), OR (III) FOR ANY DIRECT DAMAGES IN EXCESS OF (IN THE AGGREGATE) OF the greater of (A) AS APPLICABLE, (1) fees paid to us for the particular Services during the immediately previous three (3) month period or (2) AMOUNTS paid to us for products purchased through the services that constitute the subject matter of the claim, or (B) $500.00.
      
      16. ARBITRATION CLAUSE & CLASS ACTION WAIVER – IMPORTANT – PLEASE REVIEW AS THIS AFFECTS YOUR LEGAL RIGHTS
      Arbitration. EXCEPT AS PROVIDED IN THE INSURANCE CONTRACT, YOU AGREE THAT ALL DISPUTES BETWEEN YOU AND US (WHETHER OR NOT SUCH DISPUTE INVOLVES A THIRD PARTY) WITH REGARD TO YOUR RELATIONSHIP WITH US, INCLUDING WITHOUT LIMITATION DISPUTES RELATED TO THESE TERMS OF SERVICE, YOUR USE OF THE SERVICES, AND/OR RIGHTS OF PRIVACY AND/OR PUBLICITY, WILL BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION UNDER THE AMERICAN ARBITRATION ASSOCIATION’S RULES FOR ARBITRATION OF CONSUMER-RELATED DISPUTES AND YOU AND WE HEREBY EXPRESSLY WAIVE TRIAL BY JURY; PROVIDED, HOWEVER, THAT TO THE EXTENT THAT YOU HAVE IN ANY MANNER VIOLATED OR THREATENED TO VIOLATE OUR INTELLECTUAL PROPERTY RIGHTS, WE MAY SEEK INJUNCTIVE OR OTHER APPROPRIATE RELIEF IN ANY STATE OR FEDERAL COURT IN THE STATE OF NEW YORK. DISCOVERY AND RIGHTS TO APPEAL IN ARBITRATION ARE GENERALLY MORE LIMITED THAN IN A LAWSUIT, AND OTHER RIGHTS THAT YOU AND WE WOULD HAVE IN COURT MAY NOT BE AVAILABLE IN ARBITRATION. As an alternative, you may bring your claim in your local “small claims” court, if permitted by that small claims court’s rules and if within such court’s jurisdiction, unless such action is transferred, removed or appealed to a different court. You may bring claims only on your own behalf.  Neither you nor we will participate in a class action or class-wide arbitration for any claims covered by this agreement to arbitrate. YOU ARE GIVING UP YOUR RIGHT TO PARTICIPATE AS A CLASS REPRESENTATIVE OR CLASS MEMBER ON ANY CLASS CLAIM YOU MAY HAVE AGAINST US INCLUDING ANY RIGHT TO CLASS ARBITRATION OR ANY CONSOLIDATION OF INDIVIDUAL ARBITRATIONS. You also agree not to participate in claims brought in a private attorney general or representative capacity, or consolidated claims involving another person’s account, if we are a party to the proceeding. This dispute resolution provision will be governed by the Federal Arbitration Act and not by any state law concerning arbitration. In the event the American Arbitration Association is unwilling or unable to set a hearing date within one hundred and sixty (160) days of filing the case, then either we or you can elect to have the arbitration administered instead by the Judicial Arbitration and Mediation Services. Judgment on the award rendered by the arbitrator may be entered in any court having competent jurisdiction. Any provision of applicable law notwithstanding, the arbitrator will not have authority to award damages, remedies or awards that conflict with these Terms of Service. You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of, related to or connected with the use of the Services or these Terms of Services must be filed within one (1) year after such claim of action arose or be forever banned.
      Severability. If the prohibition against class actions and other claims brought on behalf of third parties contained above is found to be unenforceable, then all of the preceding language in this Arbitration section will be null and void. This arbitration agreement will survive the termination of your relationship with us.
      
      17. Governing Law and Jurisdiction
      These Terms of Service shall be governed by and construed in accordance with the laws of the State of [insert], including its conflicts of law rules, and the United States of America, and without regard to the Convention on Contracts for the International Sale of Goods. You agree that any dispute arising from or relating to the subject matter of these Terms of Service shall be governed by the exclusive jurisdiction and venue of the state and Federal courts of [insert].
      
      18. Modification
      We reserve the right, in our sole discretion, to modify or replace any of these Terms of Service, or change, suspend, or discontinue the Services (including without limitation, the availability of any feature, database, or content) at any time by posting a notice on the Site or by sending you notice through the Services, via e-mail or by another appropriate means of electronic communication. We may also impose limits on certain features and services or restrict your access to parts or all of the Services without notice or liability. While we will timely provide notice of modifications, it is also your responsibility to check these Terms of Service periodically for changes. Your continued use of the Services following notification of any changes to these Terms of Service constitutes acceptance of those changes, which will apply to your continued use of the Services going forward. Your use of the Services is subject to the Terms of Service in effect at the time of such use.
      
      19. Miscellaneous
      Entire Agreement and Severability. These Terms of Service and the Insurance Contract are the entire agreement between you and us with respect to the Services, including use of the Site, and supersede all prior or contemporaneous communications and proposals (whether oral, written or electronic) between you and us with respect to the Services. If any provision of these Terms of Service is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that these Terms of Service will otherwise remain in full force and effect and enforceable. The failure of either party to exercise in any respect any right provided for herein shall not be deemed a waiver of any further rights hereunder.
      
      Force Majeure. We shall not be liable for any failure to perform our obligations hereunder where such failure results from any cause beyond our reasonable control, including, without limitation, mechanical, electronic or communications failure or degradation.
      
      Assignment. These Terms of Service are personal to you, and are not assignable, transferable or sublicensable by you except with our prior written consent. We may assign, transfer or delegate any of our rights and obligations hereunder without consent.
      
      Agency. No agency, partnership, joint venture, or employment relationship is created as a result of these Terms of Service and neither party has any authority of any kind to bind the other in any respect.
      
      Notices. Unless otherwise specified in these Term of Service, all notices under these Terms of Service will be in writing and will be deemed to have been duly given when received, if personally delivered or sent by certified or registered mail, return receipt requested; when receipt is electronically confirmed, if transmitted by facsimile or e-mail; or the day after it is sent, if sent for next day delivery by recognized overnight delivery service. Electronic notices should be sent to [insert].  
      
      No Waiver. Our failure to enforce any part of these Terms of Service shall not constitute a waiver of our right to later enforce that or any other part of these Terms of Service. Waiver of compliance in any particular instance does not mean that we will waive compliance in the future. In order for any waiver of compliance with these Terms of Service to be binding, we must provide you with written notice of such waiver through one of our authorized representatives.
      Headings. The section and paragraph headings in these Terms of Service are for convenience only and shall not affect their interpretation.
      
      Contact. You may contact us at the following address: [insert]
      
      Effective Date of Terms of Service: `,
    ],
  },
];

export default function InsuranceApplicationTermsOfService(props: {
  nextCallback: () => void;
}) {
  const [checked, setChecked] = useState<boolean>(false);
  const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);
  const handleScroll = (e: any) => {
    const reachedBottom =
      e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight + 20;
    reachedBottom && setScrolledToBottom(reachedBottom);
  };
  return (
    <InsuranceApplicationDialog title="TERMS OF SERVICE">
      <div className="h-full w-full flex flex-col p-3xl gap-3xl">
        <div className="flex flex-col gap-lg">
          <div className="font-medium text-xl">
            Read through and acknowledge the Terms of Service below
          </div>
          <div
            className="h-[650px] w-full border-2 border-solid border-greyscale-6 rounded-xs p-3xl text-darkTeal-5 text-lg overflow-scroll flex flex-col gap-[32px]"
            onScroll={handleScroll}
          >
            <div className="text-darkTeal-5 font-medium">
              Anchorwatch Terms of Service
            </div>
            <div className="flex flex-col gap-lg">
              Please read these Terms of Service for Anchorwatch, Inc.
              (“Anchorwatch”, “we”, “us” or “our”) (together with our privacy
              policy found at [insert link] (the “Privacy Policy”, and
              collectively the “Terms of Service” or “Terms”) fully and
              carefully before using www.anchorwatch.com (the “Site”), our
              mobile applications for iOS and Android (each, an “App”), and the
              services, features, products, content or applications offered by
              Anchorwatch (together with the Site and the Apps, the “Services”)
            </div>
            {TOS.map((tosSection, i) => (
              <div key={i} className="flex flex-col gap-lg">
                {tosSection.title ? (
                  <div className="font-medium text-darkTeal-5">
                    {tosSection.title}
                  </div>
                ) : null}
                <div className="flex flex-col gap-lg px-[20px]">
                  {tosSection.paragraphs.map((p, j) => (
                    <div key={j} className="text-darkTeal-5">
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex items-center gap-[12px]"
          style={{
            opacity: scrolledToBottom ? 1 : 0.35,
            pointerEvents: scrolledToBottom ? undefined : "none",
            transition: "0.2s",
          }}
        >
          <AWCheckbox checked={checked} callback={() => setChecked(!checked)} />
          <div className="text-lg font-normal text-darkTeal-5">
            I agree to the terms of service
          </div>
        </div>

        <div className="flex flex-col gap-lg">
          <AWButton onClick={props.nextCallback} disabled={!checked}>
            Next
          </AWButton>
        </div>
      </div>
    </InsuranceApplicationDialog>
  );
}
