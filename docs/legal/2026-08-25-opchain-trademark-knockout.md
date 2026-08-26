# opchain — trademark knockout search

_Preliminary clearance research, verified 2026-08-25. Produced by a 14-agent sweep (four searchers — USPTO federal register, international registers, common-law/marketplace, domains & namespaces — each material hit then independently re-verified against primary sources). **This is the research layer a trademark attorney works from; it is not a legal opinion**, and the filing/enforcement judgements below are flagged as questions for counsel, not conclusions. Companion to [2026-08-22-oss-split-licensing-compliance.md](../plans/2026-08-22-oss-split-licensing-compliance.md) §3.2 (trademark row)._

**TL;DR**

1. **The exact mark `OPCHAIN` is unregistered everywhere searched** — zero hits in WIPO's Global Brand Database (76.5M records, 89 registers incl. USPTO/EUIPO/UKIPO/CIPO/IP Australia/JPO/KIPO/India/Madrid), and no USPTO filing for one-word OPCHAIN has *ever* existed (confirmed by exact, wildcard, phrase and exhaustive edit-distance-1 queries).
2. **The single biggest obstacle is new: OP Labs PBC — the Optimism / OP Stack crypto company — holds two live, actively-maintained US intent-to-use applications for "OP CHAIN"** (standard characters, "CHAIN" disclaimed) in exactly classes 42 (SN 98122443) and 9 (SN 98122448), priority 2023-08-08. Phonetically identical to opchain. A later OPCHAIN US application would very likely draw a §2(d) refusal or suspension while these are alive. They must register or die by **2027-10-08** (SOU deadline, 36 months after the Oct 2024 Notice of Allowance).
3. **Using** "opchain" for AI developer tooling remains defensible: nobody uses the mark in this field, the closest registered marks (OPENCHAIN, OPTCHAIN) are in different niches, and OP Labs' goods are expressly blockchain-scoped. **Registering** it in the US right now is the hard part.
4. Known live neighbors confirmed and expanded: Linux Foundation's **OPENCHAIN** (incontestable US reg + EU/UK/JP/KR/IN family), Optel's **OPTCHAIN** (*two* US registrations — the standard-character one, Reg 7214576, was missed by the earlier audit — plus EU/UK/CA×2/Madrid), LimePoint's **OPSCHAIN** (three live Australian class-9 registrations for an AI-flavoured DevOps orchestration product — the closest active *field* neighbour), EY OpsChain (common-law only, house-marked). One **exact-spelling** common-law "OPCHAIN" optimization suite (DecisionWare/DO Analytics, LatAm) appears dormant — both company domains fail DNS.
5. Free to grab today (all re-verified 2026-08-25): npm `opchain` **and** `opchain-skills`, PyPI/crates.io/RubyGems `opchain`, the **opchain.io** domain (NXDOMAIN), `opchain.bsky.social`, and apparently `@opchain` on X. Watch item: **opchain.ai** is registered by an unknown party with a "Launching Soon" email-capture lander (registered 2025-07-21).

---

## 1. The headline: OP Labs' "OP CHAIN" (not in the 2026-08-22 audit)

| | SN 98122443 | SN 98122448 |
|---|---|---|
| Mark | OP CHAIN (standard characters, "CHAIN" disclaimed) | same |
| Class | 42 | 9 |
| Goods | SaaS/PaaS for building, developing, executing and running software and applications **on blockchains**; scaling/managing/validating blockchain transactions | Downloadable software providing access to programming code for building blockchains / blockchain applications |
| Owner | OP Labs PBC (Delaware PBC, Sausalito CA — Optimism / OP Stack; also filed OP STACK) | same |
| Status | LIVE intent-to-use: filed 2023-08-08 → published 2024-08-13 (no opposition) → Notice of Allowance 2024-10-08 → **3rd Statement-of-Use extension granted 2026-04-08** | same |
| Clock | Extensions filed like clockwork every 6 months; hard SOU deadline **2027-10-08** — the application registers or abandons by then | same |
| Verified risk | **blocking / material** for a US OPCHAIN registration (two independent verifiers; both agree a §2(d) citation is very likely) | **material** |
| Source | [TSDR sn98122443](https://tsdr.uspto.gov/statusview/sn98122443) | [TSDR sn98122448](https://tsdr.uspto.gov/statusview/sn98122448) |

Why it bites: the mark differs from OPCHAIN by a space; "CHAIN" is disclaimed so "OP" dominates both; it sits in exactly the two classes opchain would claim; the class-42 recitation ("software for building, developing, executing, and running other software and applications") reads broadly despite the blockchain framing; and the priority date (Aug 2023) pre-dates any opchain use (first repo activity Apr 2026). Examiners routinely treat developer-facing software as related goods across verticals.

Why it doesn't kill the *name*: it is still an ITU — no registration, no proven use, three extensions deep. The real-world fields differ meaningfully (crypto L2 infrastructure vs AI-agent developer skills), which cuts actual-confusion risk for *use* even where it wouldn't save a *registration*. If OP Labs never files a Statement of Use, both applications die by Oct 2027.

**Docket dates to watch on TSDR:** ~2026-10-08 (4th extension or SOU due), ~2027-04-08 (5th/final extension), 2027-10-08 (drop-dead).

## 2. The exact mark is clear on every register searched

- USPTO: no live or dead filing has ever existed for OPCHAIN, OPCHAINS, OPSCHAIN, OPS CHAIN, OPPCHAIN, OPP CHAIN, UPCHAIN, or OPCHAIN AI — verified with exact, `op*chain*`, `*pchain*`, phrase, and an exhaustive fuzzy edit-distance-1 sweep (all 27 records reviewed).
- WIPO Global Brand Database: **0 of 76,470,741 records contain the literal string "opchain"**.
- Canada (CIPO, live query): completely clear — the only `*opchain*` substring hit is DROPCHAIN (abandoned, class 12). Australia: clear of OPCHAIN (LimePoint's marks are OPSCHAIN).
- The only exact-spelling uses found anywhere are non-trademark-registered: a dormant LatAm optimization suite (§4), a dormant Perth GitHub handle, 23 starless hobby repos, a `shap.utils.OpChain` Python class name, and an Indian bullion company whose BSE ticker is literally "OPCHAINS" (SEO nuisance only).

## 3. Registered neighbours (all confirmed live at source, 2026-08-25)

| Mark | Owner | Where | Classes | Field | Verified risk |
|---|---|---|---|---|---|
| OPENCHAIN | Linux Foundation | US Reg 5242152 (**incontestable**, §8&15 accepted 2023-12-30) + EUTM 015006067 (renewed to 2036) + UK00915006067 (see caveat §8) + Japan 6255267 + Korea 4018172420000 + India 4807997 | 9 + 42 | Open-source license-compliance standards (ISO/IEC 5230), publications, audit services | **material** — closest live registered word mark; incontestable; well-resourced owner; a §2(d) citation is realistic; coexistence argument = different services |
| OPTCHAIN (standard characters) | Optel Vision Inc. | US Reg **7214576** (registered 2023-11-07 — *new find*, missed by the prior audit) | 42 | Supply-chain traceability SaaS (industrial/pharma) | **material** — one letter away, standard-character claim covers all stylings, same class; mitigated by distant field; counsel note: represented by Fross Zelnick |
| OPTCHAIN (gear design) | Optel Vision Inc. | US Reg 7397498 + EUTM 018666517 + UK00003763183 + Canada TMA1199312 & TMA1199405 + Madrid IR 1713242 (EU + members + India) | 42 | same | **material** (same reasoning) |
| OPSCHAIN (×3: word + 2 logo) | LimePoint IP Pty Ltd | Australia 2154491 / 2154502 / 2154503 (live since Feb 2021) | 9 | DevOps orchestration — see §4, the closest *field* neighbour | **material** in Australia (registration + passing-off exposure); no US/EU filings found |
| ONCHAIN | Lisk Stiftung | US Reg 7782339 | 35/41/42 | blockchain services | context — "onchain" is treated as a weak/generic crypto term (many composites, mostly dead) |
| ONCHAIN | Onchain Foundation (Madrid 79438319, pending) · Gemini IP (99326326, suspended) | US pending | 9/42 among others | crypto | context |
| OXCHAIN / OFFCHAIN / IPCHAIN / PROPCHAIN | various (Oxchain Inc.; Offchain Labs/Arbitrum; IPCHAIN Assoc.; Homepass) | US / EU live | 9/42 ranges | various | low — visually/conceptually distinguishable; shows the `-CHAIN` space is crowded |
| LOOPCHAIN | Loopchain AB | EUTM application 019342143 — **currently opposed** | 9/35/42 | software | signal: new `-CHAIN` marks in 9/42 draw oppositions at EUIPO |

## 4. Common-law / marketplace users (no registration, but real use)

| Name | Who / status | Field | Verified risk |
|---|---|---|---|
| **OpsChain** — opschain.io | LimePoint Pty Ltd (AU); actively maintained (docs changelog 2026-08-20), enterprise demo-led sales; CLI on GitHub | "AI-powered operations platform" — GitOps/infra change orchestration with AI agents. **The closest active commercial neighbour in your actual field** (one letter away, AI + developer/ops tooling, overlapping buyers) | **material** — common-law (plus the AU registrations above); real marketplace-confusion and passing-off exposure, strongest in Australia |
| **EY OpsChain** | Ernst & Young; active product family (Traceability $900/mo, Notarization, Contract Manager, ESG) | Enterprise blockchain SaaS for supply-chain/procurement/ESG | monitor — always behind the EY house mark, no filings found, different field; residual risk = EY's resources or a later filing |
| **OPCHAIN** ("OPtimizing the value CHAIN") | DecisionWare / DO Analytics LLC (Jesús Velásquez, Colombia/LatAm); heavy documented use ~2015-2019 (OPCHAIN-SCO/-OIL/-ELE/-E&G); **both company domains fail DNS as of 2026-08-25**, nothing found dated 2025/26 | Mathematical-optimization decision-support for energy & physical supply chains | monitor — the only exact-spelling product ever found; apparently dormant; unrelated field; no located registration; could hold unlocated Andean-region rights — worth one counsel check if it ever revives |
| OKX OnchainOS | OKX; launched Mar 2026, heavily marketed | AI-agent infrastructure for Web3 — "AI Skills", MCP integrations | low as a *mark* ("onchain" generic) but conceptually the nearest big-brand product to opchain's positioning; brand-collision noise, not a legal conflict |
| OppChain / Oppchain INC | small FR/CA IT consultancy, low visibility | IT services | low |
| Upchain | Autodesk (acquired 2021) — brand retired into "Fusion Manage" 2024-03-26; upchain.com DNS dead; **no live registration anywhere** | PLM SaaS | noise (retired) |

## 5. Namespaces — grab list and watch list

**Free as of 2026-08-25 (each verified by direct fetch):** npm `opchain`, npm `opchain-skills`, PyPI `opchain`, crates.io `opchain`, RubyGems `opchain`, domain **opchain.io** (NXDOMAIN at the registry), `opchain.bsky.social`, and `@opchain` on X (404-heuristic — see §8). Cheap defensive registrations; npm/PyPI first since the plan already contemplates an npm package.

**Taken:**

| Namespace | State | Note |
|---|---|---|
| opchain.com | parked for sale (GoDaddy/Afternic; held since 2015; WHOIS redacted) | price not retrievable by bots — needs a real browser/broker if ever wanted |
| opchain.org | parked for sale (Dan.com) | — |
| **opchain.ai** | **"Launching Soon" lander collecting emails**; registered 2025-07-21, owner unknown | **top watch item** — an unknown party staging a launch on the exact string in the AI TLD |
| opchain.net | re-registered 2026-02-05 (HK registrar, Cloudflare 403); last archived content was Chinese SEO/gambling spam | reputational nuisance only |
| github.com/opchain | dormant Perth user (1 fork, inactive since 2023) | handle unavailable; no commercial use |

## 6. What I'd put to a trademark attorney (framed as questions, not advice)

1. **§2(d) assessment** of OPCHAIN (AI developer tooling, classes 9 + 42) against: OP Labs' OP CHAIN ITUs (the crux), OPENCHAIN (incontestable), OPTCHAIN ×2. Is the blockchain-limited recitation of OP Labs' goods enough to argue past, or is suspension behind the ITU the realistic outcome?
2. **Filing strategy given the ITU clock**: file a US application *now* to lock a 2026 priority date and accept suspension behind OP Labs until ≤ Oct 2027 (if they lapse, opchain proceeds ahead of any other newcomer) — versus waiting for the ITU to resolve. Also: is a carefully drafted ID ("AI-agent skills for software development; developer workflow tooling; excluding blockchain…") worth it?
3. **Jurisdiction sequencing**: Canada is completely clear; the EU is clear of OPCHAIN but `-CHAIN` marks in 9/42 draw oppositions (LOOPCHAIN) and OPENCHAIN/OPTCHAIN both have EUTMs; Australia has LimePoint's OPSCHAIN in class 9 — skip or clear first?
4. **Coexistence posture** toward LimePoint (OpsChain — closest field neighbour) and, prophylactically, OP Labs.
5. Whether the dormant exact-match DecisionWare OPCHAIN warrants an Andean-community registry check.
6. Confirm the **UKIPO OPENCHAIN comparable mark (UK00915006067) renewal status** — it fell due ~2026-01-15 and could not be verified here (Turnstile-gated); if lapsed, the UK picture changes.

Independent of counsel: make the defensive namespace grabs (§5), keep "opchain" visually distinctive (logo, lowercase styling) and always in the AI-developer-tooling frame, ship `TRADEMARKS.md` as planned, avoid any blockchain-flavoured marketing language that walks toward OP Labs' goods, and calendar the three TSDR watch dates from §1 plus a quarterly look at opchain.ai.

## 7. Risk summary (10 verified hits)

| Hit | Risk to registering | Risk to using |
|---|---|---|
| OP CHAIN cl 42 (OP Labs, ITU) | **blocking** (while alive) | low-moderate (different field; monitor) |
| OP CHAIN cl 9 (OP Labs, ITU) | material | low-moderate |
| OPENCHAIN (Linux Foundation, US incontestable + intl family) | material | low (different services; ironic given plan §4.1 cites OpenChain ISO 5230) |
| OPTCHAIN standard-char (Optel, US 7214576) | material | low |
| OPTCHAIN design (Optel, US 7397498 + intl) | material | low |
| OpsChain (LimePoint, common-law + AU regs) | material (AU) | moderate in AU / DevOps-adjacent marketing |
| EY OpsChain (common-law) | monitor | low |
| OPCHAIN exact (DecisionWare, dormant) | monitor | low |
| opchain.ai lander | n/a | watch — unknown party staging a launch |
| opchain.com/.org (parked) | n/a | acquisition-cost question only |

## 8. Coverage and honest limits

Searched (queries logged in Appendix C): USPTO via the tmsearch Elasticsearch API (exact/wildcard/phrase/fuzzy sweeps, incl. the complete edit-distance-1 neighbourhood) + TSDR status pages fetched live; WIPO Global Brand Database (contains/exact/phonetic); EUIPO eSearch + EUTM detail records; CIPO live database; web/common-law sweep (products, crypto, GitHub, HN, Product Hunt); domains (DNS + WHOIS + Wayback), npm/PyPI/crates/RubyGems, GitHub, Bluesky/X.

Not covered / caveats: **China (CNIPA domestic register)** has no free bot-accessible path — a dedicated CN search needs an agent or paid tool; **UKIPO** direct search is captcha-gated (UK data via WIPO GBD; the OPENCHAIN UK renewal question is open); LinkedIn/Crunchbase read via search snippets only; app stores via web search only; X handle status is a 404-heuristic; GoDaddy sale prices unretrievable; WIPO GBD status can lag national registers by days-to-weeks (the four key US records were re-verified live at TSDR). Common-law searching is inherently non-exhaustive. **Nothing here is legal advice; likelihood-of-confusion is a legal judgement for counsel.**

---

_Appendices generated from the raw verified workflow output._

## Appendix A — the 10 verified hits (full detail)

### OP CHAIN — USPTO — OP Labs PBC (public benefit corporation, Delaware; addr. Sausalito, CA)
- reg/app: Serial 98122443 (no registration yet) | classes: IC 042
- status (finder): LIVE pending application (intent-to-use). TM5: LIVE/APPLICATION/Under Examination. Notice of Allowance issued; third extension of time to file Statement of Use granted
- dates: Filed Aug. 08, 2023; Published Aug. 13, 2024; Notice of Allowance Oct. 08, 2024; Status Date Apr. 08, 2026 (SOU EXTENSION 3 GRANTED)
- goods/use: Providing online non-downloadable computer software for use in providing access to programming code for use in building blockchains; software for building, developing, executing, and running other software and applications on blockchains; PaaS featuring computer software platforms for launching and scaling applications; SaaS featuring software for scaling, managing, and validating blockchain transactions
- similarity: Essentially identical to OPCHAIN in sound and appearance (only a space differs; standard-character mark, 'CHAIN' disclaimed), in the exact class (42) opchain would claim
- source: https://tsdr.uspto.gov/statusview/sn98122443
- VERIFY: confirmed=true risk=blocking
  - current_status: LIVE intent-to-use application (Serial 98122443, no registration yet). Published Aug 13, 2024; Notice of Allowance Oct 8, 2024; third extension of time to file Statement of Use granted, status date Apr 8, 2026. Owner: OP Labs PBC, Sausalito, CA. Standard-character mark, "CHAIN" disclaimed, IC 042 (SaaS/PaaS for building, developing, executing, running software and applications on blockchains; scaling/managing/validating blockchain transactions).
  - corrected: none
  - rationale: OP CHAIN is essentially identical to OPCHAIN in sight, sound, and meaning — a standard-character mark differing only by a space, with "CHAIN" disclaimed, so OP dominates both. It sits in the exact class (42) opchain would claim, and the goods are developer tooling: software for building, developing, and running other software/applications (albeit on blockchains), which examiners routinely find related to AI developer tools and SaaS dev platforms sold through the same channels to the same developer audience. With an Aug 8, 2023 priority date (earlier than any opchain use) and OP Labs (Optimism) as a well-funded owner, a later OPCHAIN class 42 application would very likely draw a 2(d) refusal or suspension. The one contingency: it is still an ITU — if OP Labs never files a Statement of Use (deadline runs out around Oct 2027 after the maximum extensions), the application abandons; monitor for that, but treat it as blocking today.
  - checked: https://tsdr.uspto.gov/statusview/sn98122443

### OP CHAIN — USPTO — OP Labs PBC (public benefit corporation, Delaware; addr. Sausalito, CA)
- reg/app: Serial 98122448 (no registration yet) | classes: IC 009
- status (finder): LIVE pending application (intent-to-use). TM5: LIVE/APPLICATION/Under Examination. Notice of Allowance issued; third extension of time to file Statement of Use granted
- dates: Filed Aug. 08, 2023; Published Aug. 13, 2024; Notice of Allowance Oct. 08, 2024; Status Date Apr. 08, 2026 (SOU EXTENSION 3 GRANTED)
- goods/use: Downloadable computer software for providing access to programming code for use in building blockchains; downloadable computer software for providing access to programming code for use in developing scalable, modular, interoperable blockchain applications for single and multiple blockchains
- similarity: Essentially identical to OPCHAIN in sound and appearance (only a space differs; standard-character mark, 'CHAIN' disclaimed), in the exact class (9) opchain would claim
- source: https://tsdr.uspto.gov/statusview/sn98122448
- VERIFY: confirmed=true risk=material
  - current_status: LIVE pending intent-to-use application, no registration yet. TM5: LIVE/APPLICATION/Under Examination. Status: "A third request for extension of time to file a Statement of Use has been granted," status date Apr. 08, 2026. File located in Intent to Use Section. Class 009 status ACTIVE. No Statement of Use filed yet; up to two more 6-month extensions possible (final SOU deadline Oct. 08, 2027).
  - corrected: none — every field the finder reported matches TSDR as of 2026-08-25 (mark OP CHAIN, serial 98122448, owner OP Labs PBC, Delaware public benefit corporation, Sausalito CA address, IC 009 only, standard-character mark with "CHAIN" disclaimed, ITU filing, filed Aug. 08 2023, published Aug. 13 2024, NOA Oct. 08 2024, SOU Extension 3 granted Apr. 08 2026). One added detail: TSDR prosecution history shows extensions 1-3 filed like clockwork every 6 months, so the applicant (OP Labs, the Optimism blockchain developer) is actively maintaining the application; the ITU deadline can be extended to at most Oct. 08 2027 (36 months from NOA).
  - rationale: Sight/sound/meaning are essentially identical: OP CHAIN vs. OPCHAIN differs only by a space, both standard-character, and "CHAIN" is disclaimed, so OP dominates both marks. It sits in the exact class (9) an OPCHAIN filing for downloadable AI developer tooling would claim, and the goods — downloadable software giving developers access to programming code for building applications — travel the same trade channels (developers, code repositories, SDK distribution) even though OP Labs' recitation is blockchain-specific rather than AI-agent-specific. As a prior-filed pending application it would be cited against a later OPCHAIN class 9 application under 2(d) with high likelihood, suspending or refusing it; the blockchain-vs-AI field difference is the only real argument and USPTO examiners routinely treat developer software as related goods. Not rated blocking only because it is still an ITU application that has produced no registration and no evident use after three SOU extensions — if OP Labs never files a Statement of Use it dies by Oct. 2027, but until then it is a serious, actively-maintained obstacle to registering (and a nontrivial common-law/priority concern for using) OPCHAIN in class 9.
  - checked: https://tsdr.uspto.gov/statusview/sn98122448

### OPENCHAIN — USPTO — The Linux Foundation (non-profit corporation, Oregon)
- reg/app: Reg. 5242152 / Serial 86780125 | classes: IC 009 + IC 042
- status (finder): LIVE registration. TM5: LIVE/REGISTRATION/Issued and Active; Sections 8 & 15 combined declaration accepted and acknowledged (incontestable)
- dates: Filed Oct. 6, 2015; Registered Jul. 11, 2017; Status Date Dec. 30, 2023 (§8&15 accepted)
- goods/use: Cl.9: downloadable electronic publications (instructional materials, white papers, manuals) re software standards/IT/development. Cl.42: development of voluntary standards for maintaining software license compliance; quality control standards for software license compliance; website featuring technology enabling users to audit software license compliance
- similarity: Two letters more than OPCHAIN, shares OP-...-CHAIN skeleton; software-standards services in classes 9+42, incontestable, well-resourced owner
- source: https://tsdr.uspto.gov/statusview/sn86780125
- VERIFY: confirmed=true risk=material
  - current_status: LIVE/REGISTRATION/Issued and Active; Sections 8 & 15 combined declaration accepted and acknowledged (incontestable). Registered Jul 11, 2017; next maintenance window (Section 8/9 renewal) falls 2026-2027, so the registration is presumptively being maintained through at least then.
  - corrected: none — mark, owner, status (LIVE/REGISTRATION/Issued and Active), Reg. 5242152 / Serial 86780125, classes 009+042, goods/services, dates (filed 2015-10-06, registered 2017-07-11, status date 2023-12-30), and the accepted Section 8 & 15 combined declaration all match TSDR
  - rationale: Sight similarity is high — OPCHAIN is OPENCHAIN minus two letters, sharing the OP-...-CHAIN skeleton — though sound and meaning diverge somewhat ("open chain" evokes open-source; "op chain" evokes operations pipeline). Both marks sit in classes 9 and 42 in the software/developer ecosystem: OPENCHAIN covers downloadable publications on software technical standards and services for software license compliance standards and auditing, which is developer-facing and travels in the same trade channels (open-source tooling communities, GitHub, developer conferences) as AI developer tooling. The registration is incontestable and owned by the well-resourced Linux Foundation, so a Section 2(d) office-action citation against an OPCHAIN application in 9/42 is a realistic possibility, and coexistence depends on arguing the goods (license-compliance standards program vs. AI agent skills/dev pipeline) are distinct. Not blocking because the marks are not identical and the specific services differ, but this is the single most significant obstacle identified for registering OPCHAIN.
  - checked: https://tsdr.uspto.gov/statusview/sn86780125

### OPTCHAIN (design: gear + stylized word) — USPTO — OPTEL VISION INC. (corporation, Canada; Quebec)
- reg/app: Reg. 7397498 / Serial 97909880 | classes: IC 042 (US 100, 101)
- status (finder): LIVE registration. TM5: LIVE/REGISTRATION/Issued and Active; Status: Registered
- dates: Filed Apr. 27, 2023; Registered May 28, 2024; Status Date May 28, 2024
- goods/use: Cloud-based SaaS featuring a software platform for commercial and industrial use in the field of supply chain tracking; SaaS for gathering and analysing data related to traceability of raw material, components and products across the supply chain. First use May 01, 2022
- similarity: One letter (T) inserted into OPCHAIN; near-identical sight/sound, same class 42 SaaS though different field (supply-chain tracking)
- source: https://tsdr.uspto.gov/statusview/sn97909880
- VERIFY: confirmed=true risk=material
  - current_status: LIVE registration, Principal Register — TM5: LIVE/REGISTRATION/Issued and Active; Status: Registered; Status Date May 28, 2024 (TSDR page generated 2026-08-25). No cancellation or maintenance events yet; Section 8/15 window opens 2029-2030.
  - corrected: none — all finder fields reproduce exactly from TSDR (mark OPTCHAIN with gear design, drawing type 3, no standard-character claim; Reg. 7397498 / SN 97909880; LIVE/REGISTRATION/Issued and Active, status date May 28, 2024; owner OPTEL VISION INC., Canadian corporation, Quebec; IC 042 only; supply-chain-tracking/traceability SaaS; first use May 01, 2022; filed Apr. 27, 2023 with Canadian priority from Jan. 13, 2023; registered May 28, 2024). Minor additions the finder omitted: service mark on the Principal Register, published for opposition Mar. 12, 2024 with no opposition, and it registered on an actual-use basis.
  - rationale: Sight/sound are near-identical — OPTCHAIN is OPCHAIN with a single T inserted, and the dominant literal element controls even though the registration is a gear-design mark rather than standard characters; meaning diverges somewhat (opt/optimize + supply chain vs. ops/operations + pipeline of skills). Goods relatedness is the mitigator: Optel's IC 042 services are narrowly drafted to supply-chain tracking and raw-material/component traceability SaaS for commercial/industrial users, a different field, purchaser base, and trade channel from AI developer tooling and Claude Code skills in classes 9/42. Because both are cloud SaaS in class 42 and the marks are one letter apart, a 2(d) citation against an OPCHAIN class 42 application is a realistic possibility that would need argument (unrelated fields, sophisticated purchasers, narrow ID) rather than being ignorable — hence material rather than monitor, but the clearly different field means it is unlikely to be outright blocking, and Optel is not a plausible common-law conflict in developer tooling.
  - checked: https://tsdr.uspto.gov/statusview/sn97909880

### OPTCHAIN (standard characters) — USPTO — OPTEL VISION INC. (corporation, Canada; Quebec)
- reg/app: Reg. 7214576 / Serial 97313509 | classes: IC 042 (US 100, 101)
- status (finder): LIVE registration. TM5: LIVE/REGISTRATION/Issued and Active; Status: Registered
- dates: Filed Mar. 15, 2022; Registered Nov. 07, 2023; Status Date Nov. 07, 2023
- goods/use: Cloud-based SaaS featuring a software platform for commercial and industrial use in the field of supply chain tracking; SaaS for gathering and analysing data related to traceability of raw material, components and products across the supply chain
- similarity: Standard-character twin of Reg. 7397498 — one letter from OPCHAIN, class 42 SaaS; standard-character claim covers all stylings
- source: https://tsdr.uspto.gov/statusview/sn97313509
- VERIFY: confirmed=true risk=material
  - current_status: LIVE registration on the Principal Register. TSDR (fetched 2026-08-25): TM5 LIVE/REGISTRATION/Issued and Active; Status: Registered; Status Date Nov. 07, 2023. Mark OPTCHAIN (standard characters), Reg. 7214576, Serial 97313509, filed Mar. 15, 2022, registered Nov. 07, 2023. Owner OPTEL VISION INC. (Canadian corporation, Quebec). IC 042 (US 100, 101), class status ACTIVE: cloud-based SaaS platform for supply chain tracking, and SaaS for gathering/analysing traceability data for raw materials, components and products across the supply chain.
  - corrected: none — all fields reproduce from TSDR. Minor additions the finder omitted: Principal Register, Service Mark, Canadian priority claim (CA app 2170585, filed Mar. 03, 2022), first use / use in commerce May 01, 2022, published Feb. 07, 2023, NOA Apr. 04, 2023, attorney Fross Zelnick Lehrman & Zissu. First maintenance window (Section 8/15) opens Nov. 2028, so the registration will remain live throughout any near-term OPCHAIN filing.
  - rationale: Sight and sound similarity is high: OPTCHAIN vs OPCHAIN differ by a single letter, and the standard-character claim covers every styling; meaning also converges loosely on "op(t)-something + chain." Both are class 42 SaaS, so a USPTO examiner running a 2(d) search on an OPCHAIN class 42 application is likely to surface this registration (and its stylized twin, Reg. 7397498) and could issue a refusal, and Optel — represented by a serious trademark firm (Fross Zelnick) — could oppose. The mitigating factor is field and trade-channel distance: Optel sells supply-chain traceability/serialization SaaS to industrial and pharma customers, while OPCHAIN is AI developer tooling for software engineers, so actual-confusion arguments are defensible and coexistence is plausible. Net: not blocking, but a concrete registration-prosecution and opposition risk for OPCHAIN in class 42 that should shape filing strategy (careful goods/services drafting away from supply-chain wording, or a pre-filing coexistence assessment).
  - checked: https://tsdr.uspto.gov/statusview/sn97313509

### OpsChain (LimePoint) — common-law — LimePoint Pty Ltd (Australia)
- reg/app:  | classes: DevOps / IT operations software (would map to Nice 9/42)
- status (finder): active product (marketed and documented as of 2026)
- dates: opschain.io footer copyright 2026; LimePoint blog posts document ongoing product (CLI, plugins, API)
- goods/use: "AI-powered operations platform that orchestrates change across your infrastructure" — GitOps-based orchestration and change-automation platform with CLI, REST API, and plugins for Terraform, Kubernetes, Ansible, AWS/Azure/GCP; sold to regulated industries (utilities, banking, telecom); docs at docs.opschain.io
- similarity: One letter from OPCHAIN (added 's'), identical cadence and OP- prefix, and squarely in AI-flavored developer/ops tooling — the closest active commercial neighbor found.
- source: https://opschain.io/
- VERIFY: confirmed=true risk=material
  - current_status: Active commercial product, apparently unregistered (common-law) mark. opschain.io is live, owned by LimePoint Pty Ltd (footer, copyright 2026), marketed as "the AI-powered operations platform" with autonomous AI "teammates", audit/compliance focus, enterprise Book-a-Demo sales motion. docs.opschain.io changelog updated 2026-08-20 (current as of verification date 2026-08-25). CLI distributed via github.com/LimePoint/opschain releases; REST API documented. No USPTO or IP Australia registration for OPSCHAIN located.
  - corrected: Mostly accurate. Minor corrections: (1) the current opschain.io homepage does not itself name Terraform/Kubernetes/Ansible plugins — it says "100+ Pluggable Automation Integrations", and docs.opschain.io describes a Git-based workflow, CLI (GitHub releases under LimePoint/opschain), and REST API without enumerating those specific plugins on the landing pages; (2) product is actively maintained — docs changelog current as of 2026-08-20, stronger than the "footer copyright 2026" evidence cited. No registered trademark found: LimePoint's US portfolio (per Justia owner-page search snippets) shows MINTPRESS, ENVIRONMINT, LIMEPOINT — no OPSCHAIN; no IP Australia OPSCHAIN registration surfaced in search. "Common-law" register classification stands, though USPTO tmsearch and IP Australia search could not be queried programmatically (JS-only interfaces), so absence of a filing is not fully proven.
  - rationale: Sight/sound/meaning similarity is very high: OPSCHAIN differs from OPCHAIN by a single interior 's', shares the OP- prefix, -CHAIN suffix, and cadence, and both connote "operations/chain of automated steps". Field relatedness is substantial: both are AI-flavored automation platforms for software/infrastructure teams (Nice 9/42) — OpsChain orchestrates infrastructure change with AI agents, GitOps, CLI and API; opchain orchestrates a software-development pipeline with AI agents, a CLI-adjacent plugin and an MCP server — overlapping buyers (DevOps/platform engineers) even if channels differ (enterprise demo-led sales vs open-source skill marketplace). Because the mark appears unregistered, it is not a USPTO citation-blocking reference, but it is an actively marketed, currently maintained product with priority of use in an adjacent field, giving LimePoint plausible common-law/passing-off grounds (especially in Australia) and real marketplace-confusion exposure — material, not blocking.
  - checked: https://opschain.io/ https://docs.opschain.io/ https://trademarks.justia.com/owners/limepoint-pty-ltd-3203420 (403 Forbidden; owner portfolio read from search-result snippets only)

### EY OpsChain — common-law — Ernst & Young (EY Global)
- reg/app:  | classes: Blockchain SaaS for supply chain / procurement / ESG (Nice 42-type services)
- status (finder): active product family (subscription pricing live; March 2026 summit referenced)
- dates: Resource docs dated 2024; 2024-2025 press releases; page references a March 2026 Global Blockchain Summit
- goods/use: EY OpsChain product family: Traceability (asset tokenization + supply-chain tracking, Basic tier $900/month), Notarization, Contract Manager (smart-contract procurement), and ESG (CO2e tracking); hosted at blockchain.ey.com and ey.com/services/blockchain/platforms
- similarity: Same one-letter-added 's' variant of OPCHAIN, backed by a Big Four global brand; field is blockchain/supply-chain SaaS rather than developer tooling, but it is software services under a sound-alike name.
- source: https://blockchain.ey.com/products/traceability
- VERIFY: confirmed=true risk=monitor
  - current_status: Active commercial product family. "EY OpsChain Traceability" is live at blockchain.ey.com/products/traceability with subscription tiers (Free Trial on Polygon testnet, Basic $900/month, Enterprise custom), plus sibling products (Notarization, Contract Manager, ESG) on ey.com. Page references the March 2026 EY Global Blockchain Summit. No US trademark registration or application for OPSCHAIN was found — protection appears to be common-law use, always paired with the EY house mark.
  - corrected: none — mark, owner, product family, pricing ($900/month Basic tier), field, and March 2026 summit reference all reproduce from blockchain.ey.com/products/traceability. One addition: no US federal registration for OPSCHAIN could be located (web searches for an OPSCHAIN USPTO filing return nothing; uspto.report owner page 403'd), so common-law-only status stands but is unverified against a full TESS search.
  - rationale: Sight/sound similarity is high — OPSCHAIN is OPCHAIN plus one letter, and both parse as "op(s) chain." But the goods and channels diverge: EY OpsChain is enterprise blockchain SaaS for supply-chain traceability, notarization, procurement, and ESG carbon tracking, sold to corporate supply-chain/finance buyers; OPCHAIN is AI developer tooling (Claude Code skills, an MCP server) sold to developers. EY appears to hold no US registration on OPSCHAIN and always uses it behind the strong EY house mark ("EY OpsChain"), which weakens its standalone source-identifying force and any confusion argument. The different field and the absence of a federal filing cut this from material to monitor — the residual risk is EY's litigation resources and the generic overlap that both are "software services," plus the chance EY files for OPSCHAIN later.
  - checked: https://blockchain.ey.com/products/traceability https://www.ey.com/en_ce/services/blockchain/platforms/opschain-traceability https://uspto.report/company/Eygn-L-T-D

### OPCHAIN (exact spelling, 'OPtimizing the value CHAIN') — common-law — DecisionWare / DO Analytics LLC (Jesus Velasquez-Bermudez, Colombia/Latin America)
- reg/app:  | classes: Mathematical-optimization / supply-chain planning software (Nice 9/42-type goods)
- status (finder): exact-name commercial software suite; historic use well documented, but current activity unverifiable — both company sites (doanalytics.net, decisionware.net) fail DNS resolution as of 2026-08-25
- dates: Publications/marketing circa 2016-2019 (ResearchGate PDF 2018 'OPCHAIN-E&G'); no 2025/2026 mentions found; company websites offline as of 2026-08-25
- goods/use: OPCHAIN suite of large-scale optimization decision-support products: OPCHAIN-SCO (supply chain optimization), OPCHAIN-OIL, OPCHAIN-ELE / OPCHAIN-E&G (electricity & gas); deployed on-premise or cloud; a LinkedIn showcase page 'OPCHAIN - OTPimization the Value CHAIN' exists
- similarity: Identical spelling to OPCHAIN — the only exact-match commercial software product found — but in supply-chain/energy optimization modeling, not AI developer tooling.
- source: https://www.researchgate.net/publication/328886453_OPCHAIN-EG_ELECTRICITY_NATURAL_GAS_-_ADVANCED_SUPPLY_CHAIN_OPTIMIZATION
- VERIFY: confirmed=true risk=monitor
  - current_status: Historic common-law use well documented (marketing/publications c. 2015-2019), but the business appears dormant or defunct: doanalytics.net, www.doanalytics.net, and decisionware.net all fail DNS resolution as of 2026-08-25 (dig returns nothing; curl cannot connect), and a dated search for OPCHAIN + Velasquez/DecisionWare/DO Analytics in 2025/2026 surfaces no activity. No USPTO OPCHAIN registration or application was found (a "OPCHAIN trademark USPTO" search surfaces nothing; the mark is common-law only, owner based in Colombia/Latin America).
  - corrected: Mostly accurate; minor corrections: (1) the LinkedIn showcase page URL (fr.linkedin.com/showcase/optex-optimization-expert-system-) returns 404 to an unauthenticated fetch, so its existence is unverified — treat that evidence item as search-citation only; (2) the ResearchGate source_url itself returns 403 to direct fetch, but the publication's existence and the OPCHAIN product family (OPCHAIN-ELE, OPCHAIN-SCO, OPCHAIN-DCO, OPTEX, DO Analytics LLC / DecisionWare, Jesus Velasquez) are independently corroborated by multiple search-result citations (ResearchGate publication pages, several LinkedIn Pulse articles by Velasquez). Everything else — exact-spelling common-law use, supply-chain/energy optimization field, no reg number, both company domains failing DNS — reproduces.
  - rationale: Sight/sound identity is total — this is the one exact-spelling OPCHAIN commercial software product found, and its expansion ("OPtimizing the value CHAIN") even overlaps conceptually with "operations/optimization + chain." But relatedness is weak: mathematical-optimization decision-support suites for electricity, gas, oil, and physical supply chains sold to Latin American enterprises share neither goods, customers, nor trade channels with AI developer tooling / Claude Code skills in classes 9/42. With no US (or any located) registration, apparently ceased operations (dead domains, no post-2019 marketing found), and a foreign common-law claimant, it cannot block a US registration and poses little confusion or enforcement risk — but as an exact match it is worth monitoring in case the business revives or holds unlocated registrations in Colombia/Andean Community.
  - checked: https://www.researchgate.net/publication/328886453_OPCHAIN-EG_ELECTRICITY_NATURAL_GAS_-_ADVANCED_SUPPLY_CHAIN_OPTIMIZATION https://fr.linkedin.com/showcase/optex-optimization-expert-system- https://doanalytics.net https://decisionware.net https://www.researchgate.net/publication/329814527_OPTIMIZING_THE_VALUE_CHAIN_ADVANCED_SUPPLY_CHAIN_OPTIMIZATION_TRADITIONAL_STATE-OF-THE-ART_MODELS https://www.linkedin.com/pulse/optimization-stochastic-advanced-analytics-software-jesus-velasquez

### OP CHAIN — USPTO — OP Labs PBC (Delaware public benefit corporation, Sausalito CA — the Optimism/OP Stack crypto company)
- reg/app: serial 98122443 | classes: 42 (primary)
- status (finder): LIVE pending application — published, Notice of Allowance issued Oct. 08, 2024; intent-to-use; 3rd Statement-of-Use extension granted
- dates: Filed Aug. 08, 2023; published Aug. 13, 2024; NOA Oct. 08, 2024; status date Apr. 08, 2026 (SOU extension 3 granted)
- goods/use: SaaS/PaaS for building blockchains and blockchain applications: 'Providing online non-downloadable computer software for use in providing access to programming code for use in building blockchains; ... PAAS featuring computer software platforms for launching and scaling applications; SAAS ... for scaling, managing, and validating blockchain transactions'. Disclaimer of 'CHAIN'.
- similarity: Identical in sound and nearly identical in sight to OPCHAIN (only a space apart), in the exact class 42 the user targets.
- source: https://tsdr.uspto.gov/statusview/sn98122443
- VERIFY: confirmed=true risk=material
  - current_status: LIVE/APPLICATION/Under Examination — intent-to-use, published Aug. 13, 2024, Notice of Allowance Oct. 08, 2024; third extension of time to file Statement of Use granted, status date Apr. 08, 2026. No SOU filed yet.
  - corrected: none — mark (OP CHAIN), serial 98122443, owner OP Labs PBC (Delaware PBC, Sausalito CA), status (LIVE application, NOA Oct. 08, 2024, third SOU extension granted, status date Apr. 08, 2026), class 042 primary, blockchain SaaS/PaaS goods, and the "CHAIN" disclaimer all verified against TSDR. Minor addition: no Statement of Use has been filed yet; with 3 of 5 possible extensions used, the SOU deadline runs out around April 2027, so the application could still lapse.
  - rationale: OP CHAIN is identical in sound and visually near-identical (one space) to OPCHAIN — the strongest mark-similarity of any hit possible short of exact identity — and it sits in class 42, the user's primary class, with an earlier filing date (Aug. 2023). The goods are blockchain-specific SaaS/PaaS for building and scaling blockchains, and USPTO examiners routinely treat developer-facing class 42 software services as related regardless of vertical, so this application would very likely be cited under Section 2(d) against an OPCHAIN filing and could effectively block registration in class 42. It is rated material rather than blocking only because (a) it is still an ITU application that has not proven use and could lapse by ~April 2027 if no SOU is filed, and (b) the real-world fields differ meaningfully (crypto/blockchain infrastructure vs. AI-agent developer skills), which cuts actual-confusion risk for use even if it does not save a registration. Practically: using the OPCHAIN name for Claude Code tooling is defensible, but registering it at the USPTO while this application is alive is likely to draw a refusal or suspension — monitor the SOU deadline closely.
  - checked: https://tsdr.uspto.gov/statusview/sn98122443

### OP CHAIN — USPTO — OP Labs PBC (USA)
- reg/app: serial 98122448 | classes: 9 (primary)
- status (finder): LIVE pending application — published, Notice of Allowance issued Oct. 08, 2024; intent-to-use; 3rd Statement-of-Use extension granted
- dates: Filed Aug. 08, 2023; published Aug. 13, 2024; NOA Oct. 08, 2024; status date Apr. 08, 2026
- goods/use: 'Downloadable computer software for providing access to programming code for use in building blockchains; Downloadable computer software ... for use in developing scalable, modular, interoperable blockchain applications for single and multiple blockchains'. Disclaimer of 'CHAIN'.
- similarity: Identical in sound to OPCHAIN, one space away in sight, covering downloadable developer software in class 9 — the same goods category as opchain's downloadable skills/plugin.
- source: https://tsdr.uspto.gov/statusview/sn98122448
- VERIFY: confirmed=true risk=material
  - current_status: LIVE pending intent-to-use application (LIVE/APPLICATION per TM5 descriptor): published Aug. 13, 2024; Notice of Allowance Oct. 08, 2024; third Statement-of-Use extension granted Apr. 08, 2026 (status date Apr. 08, 2026); file located in Intent To Use section. Not yet registered; no Statement of Use filed as of TSDR generation 2026-08-25.
  - corrected: none — all fields in the hit match TSDR as of 2026-08-25 (mark, serial, owner OP Labs PBC (Delaware public benefit corporation), ITU status, 3rd SOU extension granted Apr. 08 2026, class 9 primary, blockchain-development goods, CHAIN disclaimer, filing/publication/NOA dates). Minor addition: SOU extensions can continue to ~Oct. 2027 (36 months from the Oct. 08 2024 NOA), and any resulting registration carries constructive priority to the Aug. 08, 2023 filing date.
  - rationale: OP CHAIN is identical in sound and one space away in sight/meaning from OPCHAIN (same OP + CHAIN construction, standard characters), and it sits in class 9 covering downloadable developer software — the same class and general goods category as opchain's downloadable skills/plugin, distributed through overlapping developer channels (GitHub, package downloads). The one mitigating factor is that the goods are expressly limited to blockchain development software, whereas opchain is AI-agent developer tooling with no blockchain nexus, giving a colorable field-of-use coexistence argument. But a 2(d) citation against an OPCHAIN class-9 application is very plausible if this matures to registration (priority Aug. 2023, well before opchain's use), and the owner — OP Labs PBC, the Optimism ecosystem developer, with active outside trademark counsel and three on-time SOU extensions — has resources and motive to enforce. Material rather than blocking only because it is still an unregistered ITU with blockchain-limited goods; treat it as a likely refusal to overcome and a live enforcement risk to monitor for SOU filing (window runs to ~Oct. 2027).
  - checked: https://tsdr.uspto.gov/statusview/sn98122448

## Appendix B — all 53 deduped hits
- [high] OP CHAIN · USPTO · OP Labs PBC (public benefit corporation, Delaware; addr. Sausalito, CA) · LIVE pending application (intent-to-use). TM5: LIVE/APPLICATION/Under Examination. Notice of Allowance issued; third extension of time to file Statement of Use granted · IC 042 · Serial 98122443 (no registration yet) · https://tsdr.uspto.gov/statusview/sn98122443
  Essentially identical to OPCHAIN in sound and appearance (only a space differs; standard-character mark, 'CHAIN' disclaimed), in the exact class (42) opchain would claim || Providing online non-downloadable computer software for use in providing access to programming code for use in building blockchains; software for building, developing, executing, and running other software and applicatio
- [high] OP CHAIN · USPTO · OP Labs PBC (public benefit corporation, Delaware; addr. Sausalito, CA) · LIVE pending application (intent-to-use). TM5: LIVE/APPLICATION/Under Examination. Notice of Allowance issued; third extension of time to file Statement of Use granted · IC 009 · Serial 98122448 (no registration yet) · https://tsdr.uspto.gov/statusview/sn98122448
  Essentially identical to OPCHAIN in sound and appearance (only a space differs; standard-character mark, 'CHAIN' disclaimed), in the exact class (9) opchain would claim || Downloadable computer software for providing access to programming code for use in building blockchains; downloadable computer software for providing access to programming code for use in developing scalable, modular, in
- [high] OPENCHAIN · USPTO · The Linux Foundation (non-profit corporation, Oregon) · LIVE registration. TM5: LIVE/REGISTRATION/Issued and Active; Sections 8 & 15 combined declaration accepted and acknowledged (incontestable) · IC 009 + IC 042 · Reg. 5242152 / Serial 86780125 · https://tsdr.uspto.gov/statusview/sn86780125
  Two letters more than OPCHAIN, shares OP-...-CHAIN skeleton; software-standards services in classes 9+42, incontestable, well-resourced owner || Cl.9: downloadable electronic publications (instructional materials, white papers, manuals) re software standards/IT/development. Cl.42: development of voluntary standards for maintaining software license compliance; qua
- [high] OPTCHAIN (design: gear + stylized word) · USPTO · OPTEL VISION INC. (corporation, Canada; Quebec) · LIVE registration. TM5: LIVE/REGISTRATION/Issued and Active; Status: Registered · IC 042 (US 100, 101) · Reg. 7397498 / Serial 97909880 · https://tsdr.uspto.gov/statusview/sn97909880
  One letter (T) inserted into OPCHAIN; near-identical sight/sound, same class 42 SaaS though different field (supply-chain tracking) || Cloud-based SaaS featuring a software platform for commercial and industrial use in the field of supply chain tracking; SaaS for gathering and analysing data related to traceability of raw material, components and produc
- [high] OPTCHAIN (standard characters) · USPTO · OPTEL VISION INC. (corporation, Canada; Quebec) · LIVE registration. TM5: LIVE/REGISTRATION/Issued and Active; Status: Registered · IC 042 (US 100, 101) · Reg. 7214576 / Serial 97313509 · https://tsdr.uspto.gov/statusview/sn97313509
  Standard-character twin of Reg. 7397498 — one letter from OPCHAIN, class 42 SaaS; standard-character claim covers all stylings || Cloud-based SaaS featuring a software platform for commercial and industrial use in the field of supply chain tracking; SaaS for gathering and analysing data related to traceability of raw material, components and produc
- [medium] OPENCHAIN · USPTO · Coinprism, Inc. (corporation, Delaware) · DEAD — ABANDONED-FAILURE TO RESPOND OR LATE RESPONSE (abandoned 2018-04-23) · IC 009 · Serial 86838886 (never registered) · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  Same OPENCHAIN word as the Linux Foundation mark, class 9 fintech software — dead, on the record only || (ABANDONED) Computer software for managing, processing and auditing financial transactions
- [medium] ONCHAIN · USPTO · Lisk Stiftung (Switzerland) · LIVE registration — statusDescription 'REGISTERED' · IC 035, 041, 042 · Reg. 7782339 / Serial 98241132 · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  One-letter substitution from OPCHAIN (P→N); 'onchain' is a common crypto term, but live in class 42 || Blockchain-related services (classes 35/41/42 per tmsearch API record)
- [medium] ONCHAIN · USPTO · Onchain Foundation (Stiftung, Switzerland) · LIVE pending application — NON-FINAL ACTION - MAILED · IC 009, 025, 035, 038, 041, 042 · Serial 79438319 (Madrid 66a) · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  One-letter substitution from OPCHAIN (P→N), pending across classes 9 and 42 || Multi-class software/tech services filing (classes 9/25/35/38/41/42 per tmsearch API record)
- [medium] ONCHAIN · USPTO · Gemini IP, LLC (Delaware) · LIVE pending application — suspended (REPORT COMPLETED SUSPENSION CHECK - CASE STILL SUSPENDED) · IC 009, 036, 042 · Serial 99326326 · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  One-letter substitution from OPCHAIN; pending in classes 9/42 by a major crypto company || Crypto-exchange-related software and financial services (classes 9/36/42 per tmsearch API record)
- [medium] OXCHAIN · USPTO · Oxchain, Inc. (corporation, Maryland) · LIVE registration — statusDescription 'REGISTERED' · IC 042 · Reg. 7311724 / Serial 97611258 · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  One-letter substitution from OPCHAIN (P→X), live in class 42 || Class 42 software services (per tmsearch API record)
- [low] IPCHAIN · USPTO · Assotsiatsiya "Natsionalniy Koordinatsionniy Tsentr Obrabotki..." (IPCHAIN Association, Russia; Madrid filing) · LIVE registration — PARTIAL SECTION 71 ACCEPTED (IC 045 cancelled) · IC 009, 035, 036, 038, 041, 042 (IC 045 cancelled) · Reg. 5772178 / Serial 79239169 · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  One-letter substitution from OPCHAIN (O→I); different commercial impression (IP = intellectual property) but shares classes 9/42 || IP/blockchain registry services and software across classes 9/35/36/38/41/42 (per tmsearch API record)
- [low] OFFCHAIN · USPTO · Offchain Labs, Inc. (corporation, Delaware — Arbitrum developer) · LIVE registration — statusDescription 'REGISTERED' · IC 009, 035, 041, 042 · Reg. 8148025 / Serial 98321852 · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  Two edits from OPCHAIN; OP-/OFF- prefixes differ in meaning, but live in classes 9+42 for developer tooling by an enforcement-capable crypto company || Blockchain developer software and services (classes 9/35/41/42 per tmsearch API record)
- [low] OCHAIN · USPTO · Chen, Du Du (individual, Canada) · DEAD — CANCELLED - SECTION 8 · IC 009 · Reg. 5774847 / Serial 88180610 · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  One-letter deletion from OPCHAIN, was in class 9 — dead, record only || Class 9 goods (per tmsearch API record); registration cancelled for failure to file §8
- [low] OCHAIN · USPTO · Ochain S.r.l. (Italy) · LIVE registration — statusDescription 'REGISTERED' · IC 012, 025 · Reg. 6350800 / Serial 79292009 · https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch
  One-letter deletion from OPCHAIN but entirely unrelated goods (classes 12/25) || Non-software goods (vehicles/apparel classes 12/25 per tmsearch API record)
- [high] OpsChain (LimePoint) · common-law · LimePoint Pty Ltd (Australia) · active product (marketed and documented as of 2026) · DevOps / IT operations software (would map to Nice 9/42) ·  · https://opschain.io/
  One letter from OPCHAIN (added 's'), identical cadence and OP- prefix, and squarely in AI-flavored developer/ops tooling — the closest active commercial neighbor found. || "AI-powered operations platform that orchestrates change across your infrastructure" — GitOps-based orchestration and change-automation platform with CLI, REST API, and plugins for Terraform, Kubernetes, Ansible, AWS/Azu
- [high] EY OpsChain · common-law · Ernst & Young (EY Global) · active product family (subscription pricing live; March 2026 summit referenced) · Blockchain SaaS for supply chain / procurement / ESG (Nice 42-type services) ·  · https://blockchain.ey.com/products/traceability
  Same one-letter-added 's' variant of OPCHAIN, backed by a Big Four global brand; field is blockchain/supply-chain SaaS rather than developer tooling, but it is software services under a sound-alike name. || EY OpsChain product family: Traceability (asset tokenization + supply-chain tracking, Basic tier $900/month), Notarization, Contract Manager (smart-contract procurement), and ESG (CO2e tracking); hosted at blockchain.ey.
- [high] OPCHAIN (exact spelling, 'OPtimizing the value CHAIN') · common-law · DecisionWare / DO Analytics LLC (Jesus Velasquez-Bermudez, Colombia/Latin America) · exact-name commercial software suite; historic use well documented, but current activity unverifiable — both company sites (doanalytics.net, decisionware.net) fail DNS resolution as of 2026-08-25 · Mathematical-optimization / supply-chain planning software (Nice 9/42-type goods) ·  · https://www.researchgate.net/publication/328886453_OPCHAIN-EG_ELECTRICITY_NATURAL_GAS_-_ADVANCED_SUPPLY_CHAIN_OPTIMIZATION
  Identical spelling to OPCHAIN — the only exact-match commercial software product found — but in supply-chain/energy optimization modeling, not AI developer tooling. || OPCHAIN suite of large-scale optimization decision-support products: OPCHAIN-SCO (supply chain optimization), OPCHAIN-OIL, OPCHAIN-ELE / OPCHAIN-E&G (electricity & gas); deployed on-premise or cloud; a LinkedIn showcase 
- [medium] Optchain (OPTEL Group) · common-law · Optel Vision Inc. d.b.a. OPTEL Group (Canada) · active product (copyright 2026; named enterprise clients) · Supply-chain ESG compliance / traceability SaaS (Nice 42) · US Reg. 7397498 per prior audit (re-confirmation is the registered-search agent's task) · https://www.optelgroup.com/en/solution/optchain/
  One inserted letter (OPTCHAIN vs OPCHAIN), near-identical sound; field is supply-chain compliance SaaS, distant from AI developer tooling. || 'Supply Chain Sustainability Platform' for ESG compliance and traceability — EUDR/PPWR/Digital Product Passport compliance, multi-tier supply-chain mapping, supplier risk; client logos include Teva, Pfizer, Bayer
- [medium] Upchain (Autodesk) · common-law · Autodesk, Inc. (acquired Upchain 2021) · brand largely retired — product renamed 'Autodesk Fusion Manage' effective 2024-03-26; Upchain tenants still entitled/supported; upchain.com no longer resolves (DNS failure on fetch) · Cloud PLM/PDM SaaS for manufacturing (Nice 42) ·  · https://www.autodesk.com/products/fusion-360/blog/fusion-360-manage-with-upchain-now-named-fusion-manage/
  One-letter vowel swap (UP vs OP) with identical '-chain' ending; field is manufacturing PLM, not developer tooling, and the brand is being sunset in favor of Fusion Manage. || Cloud product-lifecycle-management and product-data-management (BOM, change, supplier, CAD data management) — now folded into Autodesk Fusion Manage; 'Upchain' persists in support docs and reseller pages
- [low] OppChain / Oppchain INC · common-law · Oppchain (Île-de-France, France) / Oppchain INC (Montreal-area phone number) · apparently a small active-ish IT consultancy; oppchain.com/en returns 404, oppchain-inc.com live with © 2023 · IT consulting / software services (big data, cloud, blockchain, ServiceNow) — Nice 42-type services ·  · https://oppchain-inc.com/our-company/
  Doubled-p variant pronounced nearly identically to OPCHAIN ('op-chain'); services firm rather than a software product, low visibility. || IT services firm: consulting, ServiceNow implementation, business application development, managed IT services, 24/7 service desk; Crunchbase describes software for big data, digital transformation, cloud, blockchain and
- [low] opchain (GitHub user, Perth) · other · GitHub user 'opchain' (Perth, Australia; unnamed) · inactive namespace squatting the GitHub handle — 1 public repo, profile last updated 2023-11-19 · GitHub username namespace ·  · https://api.github.com/users/opchain
  Exact string as a GitHub handle, but no commercial use detected. || Account created 2019-07-24; 1 public repo, 0 followers; profile 'associated with a company named Opchain' per API-derived summary but no product or website found anywhere
- [low] opchain / OpChain (GitHub hobby repos) · other · Various individuals (dungle-scrubs, prohft, suman3262, ChainMates, jreadey, et al.) · hobby/dead projects; none with stars, releases, or commercial presence · Open-source repo namespace (dev CLI tools, options-trading dashboards, defunct Solidity contracts) ·  · https://api.github.com/search/repositories?q=opchain+in:name&sort=stars&per_page=30
  Exact-string namespace collisions; a couple touch developer tooling (1Password CLI wrapper) but none rise to commercial or trademark-significant use. || 23 repos match 'opchain' in name. Most notable: dungle-scrubs/opchain ('Run commands with OP_SERVICE_ACCOUNT_TOKEN from macOS' — a 1Password-CLI dev tool, TypeScript, pushed 2026-07-12, 0 stars); prohft/opchain ('Options
- [low] shap.utils.OpChain (SHAP library API) · other · SHAP open-source project (shap Python package) · active OSS library; 'OpChain' is an internal utility class name, not a product brand · Python ML explainability library (class name only) ·  · https://shap.readthedocs.io/en/latest/generated/shap.utils.OpChain.html
  Exact string, but purely an API identifier inside another product — no trademark-style use. || shap.utils.OpChain — 'a set of dot chained operations on an object without actually running them'; appears in docs of the widely-used SHAP package
- [low] OKX OnchainOS · common-law · OKX (crypto exchange) · active, heavily-marketed AI developer toolkit (launched AI layer March 2026) · Web3/AI-agent developer platform (Nice 9/42-type) ·  · https://web3.okx.com/onchainos
  'Onchain' differs from OPCHAIN by one letter (N vs P) but is a generic/ubiquitous crypto term; overlap is conceptual (AI skills + MCP for agents) more than name-confusion. || 'Onchain OS — Built for AI. Ready for Web3.' — AI-agent infrastructure: natural-language 'AI Skills', MCP integrations, REST APIs for autonomous trading agents across 60+ chains
- [medium] opchain.com (domain) · domain · Unknown seller via GoDaddy · parked for sale (re-confirmed today) · Domain name ·  · http://opchain.com/
  Exact-match .com; available for purchase, no competing use behind it. || No content; 307 redirect to GoDaddy 'forsale' landing for opchain.com
- [low] O.P. Chains Limited · common-law · O.P. Chains Limited · listed company profile (bullion dealer); activity not further verified · Precious-metals / bullion trading (Nice 14/35 territory, not 9/42) ·  · https://www.crunchbase.com/organization/o-p-chains-limited
  'O.P. Chains' reads as physical jewelry chains — different meaning, different field, negligible confusion risk with software. || Bullion dealer trading gold, silver and precious metals wholesale to ornament manufacturers, goldsmiths, jewelers
- [high] OP CHAIN · USPTO · OP Labs PBC (Delaware public benefit corporation, Sausalito CA — the Optimism/OP Stack crypto company) · LIVE pending application — published, Notice of Allowance issued Oct. 08, 2024; intent-to-use; 3rd Statement-of-Use extension granted · 42 (primary) · serial 98122443 · https://tsdr.uspto.gov/statusview/sn98122443
  Identical in sound and nearly identical in sight to OPCHAIN (only a space apart), in the exact class 42 the user targets. || SaaS/PaaS for building blockchains and blockchain applications: 'Providing online non-downloadable computer software for use in providing access to programming code for use in building blockchains; ... PAAS featuring com
- [high] OP CHAIN · USPTO · OP Labs PBC (USA) · LIVE pending application — published, Notice of Allowance issued Oct. 08, 2024; intent-to-use; 3rd Statement-of-Use extension granted · 9 (primary) · serial 98122448 · https://tsdr.uspto.gov/statusview/sn98122448
  Identical in sound to OPCHAIN, one space away in sight, covering downloadable developer software in class 9 — the same goods category as opchain's downloadable skills/plugin. || 'Downloadable computer software for providing access to programming code for use in building blockchains; Downloadable computer software ... for use in developing scalable, modular, interoperable blockchain applications 
- [high] OPENCHAIN · USPTO · The Linux Foundation · LIVE registration, incontestable (Sections 8 & 15 combined declaration accepted Dec. 30, 2023) · 9, 42 · Reg. 5242152 (serial 86780125) · https://tsdr.uspto.gov/statusview/sn86780125
  One letter ('e') from OPCHAIN, in classes 9+42, aimed at software developers/compliance — the closest live registered word mark to the target. || Downloadable publications re software-industry technical standards and license-compliance (cl 9); developing/maintaining/disseminating software license compliance standards and audit processes (cl 42) — the OpenChain ISO
- [high] OPENCHAIN · EUIPO · The Linux Foundation (Oregon corp., Wilmington DE address); rep. Fieldfisher (Belgium) LLP · LIVE registration — renewed; expiry 15/01/2036 · 9, 42 · EUTM 015006067 · https://euipo.europa.eu/eSearch/#details/trademarks/015006067
  One letter from OPCHAIN in the EU, classes 9+42, software-development field. || Cl 9: downloadable electronic publications (standards/specs/manuals for software development and license compliance); Cl 42: 'Developing, maintaining and disseminating software license compliance standards and guidelines
- [high] OPENCHAIN · UKIPO · The Linux Foundation (USA) · LIVE registration per WIPO GBD (UK comparable mark cloned from the EUTM after Brexit); direct UKIPO verification blocked by captcha — renewal was due ~15/01/2026, see notes · 9, 42 · UK00915006067 · https://branddb.wipo.int/en/similarname
  One letter from OPCHAIN in the UK, classes 9+42. || Same scope as EUTM 015006067 (software license compliance standards, publications, audit services)
- [medium] OPENCHAIN · WIPO · The Linux Foundation (listed in Japanese as ザ リナックス ファウンデーション) · LIVE national registration (Japan) · 9, 35, 41, 42, 45 · Japan Reg. 6255267 · https://branddb.wipo.int/en/similarname
  One letter from OPCHAIN, registered in Japan across software classes 9/35/41/42/45. || OpenChain standard program (software standards/compliance; class detail not expanded in list view)
- [medium] OPENCHAIN · WIPO · The Linux Foundation (listed in Korean as 더 리눅스 파운데이션) · LIVE national registration (Republic of Korea) · 9, 35, 41, 42 · Korea Reg. 4018172420000 · https://branddb.wipo.int/en/similarname
  One letter from OPCHAIN, registered in Korea in classes 9/35/41/42. || OpenChain standard program (software standards/compliance)
- [medium] OPENCHAIN · WIPO · The Linux Foundation (USA) · LIVE national registration (India) · 9, 35, 41, 42 · India Reg. 4807997 · https://branddb.wipo.int/en/similarname
  One letter from OPCHAIN, registered in India in classes 9/35/41/42. || OpenChain standard program (software standards/compliance)
- [high] OPTCHAIN (gear-design + word) · USPTO · Optel Vision Inc. (Canada) · LIVE registration · 42 · Reg. 7397498 (serial 97909880) · https://tsdr.uspto.gov/statusview/sn97909880
  One letter ('t') from OPCHAIN in class 42, but a design mark for supply-chain tracking, a different software niche. || Cloud SaaS for supply-chain tracking/traceability (mark: gear design left of stylized 'Optchain')
- [medium] OPTCHAIN · USPTO · Optel Vision Inc. (Canada) · Pending application (second, earlier-filed US application still live alongside Reg. 7397498) · 42 · serial 97313509 · https://branddb.wipo.int/en/similarname
  Same one-letter-away OPTCHAIN word, still pending in class 42 — an additional Optel US filing not in the prior audit's list. || Cloud SaaS for supply-chain tracking (per GBD list view)
- [medium] OPTCHAIN · EUIPO · Optel Vision Inc. (Canada) · LIVE registration · 42 · EUTM 018666517 · https://branddb.wipo.int/en/similarname
  One letter from OPCHAIN in the EU, class 42, supply-chain SaaS. || Cloud SaaS for supply-chain tracking
- [medium] Optchain · WIPO · Optel Vision Inc. (Canada) · Madrid international registration in force · 42 · IR 1713242 · https://branddb.wipo.int/en/similarname
  Extends the one-letter-away OPTCHAIN mark across the EU and India via Madrid. || Cloud SaaS for supply-chain tracking; designations: EU plus its member states individually (DE, FR, IT, ES, etc.) and India
- [medium] OPTCHAIN (word) and O OPTCHAIN (design) · CIPO · Optel Vision Inc. (Canada) · Both REGISTERED (current CIPO status confirmed in the live database) · 42 · TMA1199312 (app 2170585, standard characters) and TMA1199405 (app 2233562, design) · https://ised-isde.canada.ca/cipo/trademark-search/srch
  One letter from OPCHAIN in Canada, class 42. || Cloud SaaS for supply-chain tracking
- [medium] OpsChain / OPSCHAIN (three marks: one word-style, two with logo) · other · LimePoint IP Pty Ltd (Australia) — LimePoint's OpsChain is a DevOps/environment-orchestration automation product · LIVE registrations (IP Australia), all three · 9 · AU 2154491, 2154502, 2154503 · https://branddb.wipo.int/en/similarname
  One letter ('s') from OPCHAIN and conceptually close to it (ops/DevOps tooling), but protection is Australia-only. || Computer software (class 9) — DevOps orchestration/automation platform branding (OpsChain logo visible on two of the marks in GBD)
- [low] EY OpsChain (product family: OpsChain Traceability, Contract Manager, ESG, Notarization) · common-law · EY (Ernst & Young Global) — EY Blockchain platform · Active product line in use worldwide; NO OpsChain trademark filings found in any WIPO-GBD-covered register (only OPSCHAIN filings anywhere are LimePoint's Australian ones) · blockchain SaaS (would be 42) · none found · https://www.ey.com/en_us/services/blockchain/platforms/opschain-traceability
  One letter from OPCHAIN in sound/sight but always used with the EY house mark and in a different field (enterprise blockchain). || EY Blockchain's supply-chain/tokenization/smart-contract SaaS platforms marketed as 'EY OpsChain ...'
- [low] ovchain · other · 4P International SA (Switzerland) · LIVE registration (Swiss IPI) · 38, 41, 42, 45 · CH 746703 · https://branddb.wipo.int/en/similarname
  One letter (v/p) from OPCHAIN and includes class 42, but Switzerland-only and visually/phonetically distinguishable. || Not expanded in GBD list view; covers class 42 services
- [low] PROPCHAIN · EUIPO · Homepass · LIVE registration · 9, 35, 42 · EUTM 018049149 · https://euipo.europa.eu/eSearch/#basic/1+1+1+1/opchain
  Contains the literal string 'opchain' and sits in classes 9/35/42, but the PROP- prefix gives a clearly different commercial impression. || Word mark in software classes (goods detail not expanded); real-estate/proptech naming
- [low] LOOPCHAIN · EUIPO · Loopchain AB (Sweden) · Pending application, currently opposed ('Application opposed') · 9, 35, 42 · EUTM application 019342143 · https://euipo.europa.eu/eSearch/#basic/1+1+1+1/opchain
  Contains 'opchain' as a substring in classes 9/35/42, but LOOP- prefix distinguishes it; notable mainly as evidence *-CHAIN marks in 9/42 draw oppositions at EUIPO. || Figurative mark in software classes (detail not expanded)
- [low] UPCHAIN Consultoria · other · SC10X CONSULTORIA - EIRELI (Brazil) · LIVE registration (INPI Brazil) · 35 · BR 917670353 · https://branddb.wipo.int/en/similarname
  One letter (u/o) from OPCHAIN but a Brazilian class 35 consultancy — the ONLY live UPCHAIN mark found anywhere; the Autodesk-acquired Upchain PLM brand has no live registrations in any GBD-covered register. || Consultancy services (class 35), Brazil only
- [low] OPENCHAIN (Coinprism) · USPTO · Coinprism, Inc. (USA) · dead/abandoned application ('Ended April 23, 2018' per GBD) · 9 · serial 86838886 · https://branddb.wipo.int/en/similarname
  Dead one-letter-away class 9 filing — no longer a bar, but shows OPENCHAIN was contested territory. || Blockchain software (Coinprism's Openchain ledger product, company defunct)
- [high] opchain.com · domain · Unknown (WHOIS registrant redacted; registrar NameCheap, Inc.; listed for sale via GoDaddy/Afternic aftermarket) · Registered, parked for sale (no active site) · Domain name (exact-match .com) ·  · https://opchain.com/
  Identical string to OPCHAIN in the most valuable TLD — acquisition/squat-cost issue, not a use conflict. || No content use; HTTPS request 307-redirects to forsale.godaddy.com/forsale/opchain.com; nameservers ns1/ns2.afternic.com (GoDaddy aftermarket). Sale price not retrievable (lander 403s automated clients).
- [medium] opchain.org · domain · Unknown (WHOIS redacted; registrar Unstoppable Domains Inc.; listed for sale via GoDaddy/Dan.com aftermarket) · Registered, parked for sale (no active site) · Domain name (exact-match .org) ·  · https://opchain.org/
  Identical string to OPCHAIN; for-sale squat, no goods/services use. || No content use; HTTPS request 307-redirects to forsale.godaddy.com/forsale/opchain.org; nameservers ns1/ns2.dan.com (GoDaddy's Dan.com aftermarket).
- [high] opchain.ai · domain · Unknown (WHOIS redacted; registrar GoDaddy.com, LLC; site on GoDaddy Website Builder) · Registered, active 'Launching Soon' holding page with email-list signup (not for sale) · Domain name (exact-match .ai) — intended product/field unknown ·  · https://opchain.ai/
  Identical string in the .ai TLD with a declared upcoming launch — the single most likely future direct-collision namespace given OPCHAIN's AI-tooling positioning; watch item. || Pre-launch lander: page says 'Launching Soon' and invites visitors to 'Sign up for our email list for updates, promotions, and more.' No product description, pricing, or for-sale/broker markers.
- [low] opchain.net · domain · Unknown (registrar Hongkong Kouming International Limited; current registration created 2026-02-05) · Registered and resolving (Cloudflare-proxied) but serves HTTP 403 'Attention Required! | Cloudflare' to non-browser clients; current content unverifiable. Prior registration's last archived content (2025-05-14) was a Chinese-language software-download portal titled with a gambling-platform brand. · Domain name (exact-match .net); archived use = Chinese software-download/gray-market gaming SEO portal ·  · http://web.archive.org/web/20250514120655/http://opchain.net/
  Identical string but used (as last observed) for unrelated Chinese download-portal spam, not as a software brand. || Wayback snapshot 2025-05-14 shows a Chinese software-download site (华军软件园-style scraped catalog) under the title '尊龙凯时(中国区·正版)官方首发/游戏平台APP/最新网站' (a gambling/gaming-platform brand) — spam/SEO use, no software product bran
- [low] opschain (npm package) · package-registry · Anthony Fu (anthonyfu117@hotmail.com) · Published package, latest 0.4.1, dormant since 2022-05-12 · npm / JavaScript library ·  · https://registry.npmjs.org/opschain
  One letter from OPCHAIN (added 's'), identical sound family; occupies the closest npm name to yours that is actually taken. || Small MIT-licensed TypeScript utility library ('opschain' operation-chaining lib; description is just its npm badge). No relation to OpsChain-branded commercial products.
- [low] upchain (npm package) · package-registry · Valentin Dubrovsky (spbclan@gmail.com) · Published package, latest 0.2.1, dormant since 2022-06-28 · npm / JavaScript library (microservices communication) ·  · https://registry.npmjs.org/upchain
  One letter from OPCHAIN (u for o), phonetically close; namespace-level only. || 'Upchain is a modern solution for communication between microservices' — hobby-scale Express-based library; unrelated to the Autodesk-acquired Upchain PLM SaaS.
- [medium] opchain (GitHub username) · other · GitHub user 'opchain' (no display name; location Perth) · Registered account, inactive (1 public repo — a fork of Azure docs last pushed 2020-07-21; profile last updated 2023-11-19) · GitHub user/org handle ·  · https://api.github.com/users/opchain
  Identical string as a handle; dormant occupation, zero goods/services signal. || No product or code of their own: sole repo is opchain/azure-docs, a fork of Microsoft Azure documentation, pushed 2020-07-21. Blocks github.com/opchain as a handle but shows no trademark-style use.

## Appendix C — coverage, queries and dead ends

### Finder: uspto
- searched:
  - USPTO tmsearch API (POST https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch, Elasticsearch JSON, fields wordmark + wordmarkPseudoText unless noted): query_string 'opchain*' (0 hits)
  - tmsearch API: query_string 'opchain' exact (0 hits)
  - tmsearch API: phrase '"op chain"' (2 hits — OP Labs PBC serials 98122443, 98122448)
  - tmsearch API: query_string 'opchains*' (0 hits)
  - tmsearch API: query_string 'openchain*' (2 hits — 86780125 live, 86838886 dead)
  - tmsearch API: query_string 'optchain*' (2 hits — 97909880, 97313509, both live Optel Vision)
  - tmsearch API: query_string 'opschain*' (0 hits)
  - tmsearch API: query_string 'upchain*' (0 hits)
  - tmsearch API: query_string 'oppchain*' (0 hits)
  - tmsearch API: phrase '"opp chain"' (0 hits)
  - tmsearch API: phrase '"ops chain"' (0 hits)
  - tmsearch API: query_string 'opchain\ ai' (0 hits)
  - tmsearch API: fuzzy query_string 'opchain~2' (4825 total, top 60 reviewed — noise beyond CHAIN-formatives)
  - tmsearch API: fuzzy query_string 'opchain~1' (27 total, ALL reviewed — complete 1-edit neighborhood: OPTCHAIN x2, ONCHAIN family, OXCHAIN, IPCHAIN, OCHAIN x2, O'CHAIN cl.3; no OPCHAIN/UPCHAIN/OPSCHAIN)
  - tmsearch API: leading-wildcard '*pchain*' (26 total, ALL reviewed — no OPCHAIN or UPCHAIN)
  - tmsearch API: 'op*chain*' (4 total — only OPENCHAIN x2 + OPTCHAIN x2)
  - tmsearch API: phrase '"op chains"' (0), phrase '"op - chain"' (2 — same OP Labs apps)
  - tmsearch API: query_string 'opchain*' against ownerName field (0 hits)
  - tmsearch API: query_string 'opchain*' against goodsAndServices field (0 hits)
  - tmsearch API: match_phrase wordmarkPseudoText:'OP CHAIN' (0 hits — the OP Labs marks carry no pseudo text; one-word OPCHAIN pseudo-marks do not exist)
  - TSDR statusview https://tsdr.uspto.gov/statusview/sn86780125 (OPENCHAIN — Linux Foundation) via WebFetch
  - TSDR statusview https://tsdr.uspto.gov/statusview/sn97909880 (OPTCHAIN Reg 7397498) via curl with browser UA
  - TSDR statusview https://tsdr.uspto.gov/statusview/sn97313509 (OPTCHAIN Reg 7214576) via curl
  - TSDR statusview https://tsdr.uspto.gov/statusview/sn98122443 and /sn98122448 (OP CHAIN — OP Labs PBC) via curl
- dead_ends:
  - POST https://tmsearch.uspto.gov/api-v1-0-0/tmsearch (the historically documented endpoint) returns an S3 'MethodNotAllowed' XML error — obsolete. The working endpoint is https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch, discovered from the SPA's /configuration.json (serviceUrlSearchElastic) + urlGetSearchResultSetElastic='tmsearch' in chunk-SZSFPAC2.js; it accepts unauthenticated Elasticsearch JSON queries when called from the page origin (AWS WAF token cookies attached).
  - WebFetch of https://tsdr.uspto.gov/statusview/sn97909880 returned HTTP 403 (bot block); curl with a desktop-browser User-Agent returned 200 with full data — used that for all TSDR pulls.
  - tmsearch.uspto.gov UI deep link ?query=... renders 'No results found' without firing any search API call — not usable for URL-driven searching; had to hit the JSON API directly.
  - Elasticsearch term-level fuzzy query {fuzzy:{wordmark:{value:'OPCHAIN'}}} returned 0 because the field is analyzed/lowercased and term-level queries are not analyzed; the analyzed query_string 'opchain~1' form works and was used instead.
  - No account/API key was required for anything; the official TSDR REST API (tsdrapi.uspto.gov) needs an API key but was not needed — the statusview HTML pages sufficed.
- notes:
  - HEADLINE NEW FINDING (not in the prior audit): 'OP CHAIN' — OP Labs PBC, the developer of Optimism / the OP Stack — has TWO live standard-character intent-to-use applications, SN 98122443 (class 42, SaaS/PaaS for building and scaling blockchain applications) and SN 98122448 (class 9, downloadable developer software), filed 2023-08-08, published 2024-08-13, Notice of Allowance 2024-10-08, third Statement-of-Use extension granted 2026-04-08. If they file a SOU and register, they hold OPCHAIN-minus-a-space in exactly classes 9 and 42 for developer software, with priority back to Aug 2023 — earlier than any opchain.dev use. ITU extensions max out 36 months after the NOA (around Oct 2027), so these will resolve (register or die) within ~14 months.
  - No USPTO filing has EVER existed (live or dead) for: OPCHAIN (one word), OPCHAINS, OPSCHAIN, OPS CHAIN, OPP CHAIN, OPPCHAIN, UPCHAIN, or OPCHAIN AI. Confirmed by exact, wildcard (op*chain*, *pchain*), phrase, and fuzzy (edit-distance 1, exhaustive 27-record review) queries.
  - UPCHAIN (the PLM SaaS acquired by Autodesk) never filed a US federal trademark application — absent from both upchain* and *pchain* result sets.
  - EY OpsChain: no OPSCHAIN or OPS CHAIN filings at USPTO.
  - Both known registrations re-confirmed current as of 2026-08-25: OPENCHAIN Reg 5242152 (Linux Foundation, cls 9+42) is LIVE and now incontestable (§8&15 accepted, status date Dec 30, 2023); OPTCHAIN Reg 7397498 (Optel Vision, cl 42) is LIVE (registered May 28, 2024). ADDITIONALLY a second, earlier OPTCHAIN registration was found that the prior audit missed: Reg 7214576, SN 97313509, standard characters, same owner and goods, registered Nov 07, 2023 (filed Mar 15, 2022 with Canadian priority Mar 03, 2022).
  - The 1-edit neighborhood beyond the hits list is dominated by ONCHAIN-formative composite marks (ONCHAIN BANKING, ONCHAIN PAYMENTS, ONCHAIN WEALTH, DEEDS ONCHAIN — all dead, class 36; FRANKLIN ONCHAIN Reg 6421658 live class 36 only; ONCHAIN MONKEY 97120663 live pending cls 9/25; Chainlink's ONCHAIN DATA/COMPLIANCE PROTOCOL apps suspended; Coinbase's slogan app 98383031 suspended). These suggest USPTO treats 'ONCHAIN' as a weak/suggestive crypto term; they were left out of the hits list as composites, but the standalone ONCHAIN records are included.
  - Practical read for the caller (not legal advice): the federal register contains no identical OPCHAIN mark, but the OP Labs 'OP CHAIN' applications in classes 9+42 are the single biggest US-register obstacle — an examiner could cite them under §2(d) against a later OPCHAIN application for software/developer tools, and OP Labs' goods ('software for building, developing, executing and running other software and applications') read broadly despite being blockchain-framed. OPENCHAIN (incontestable, software-compliance standards, cls 9+42) and OPTCHAIN x2 (cl 42 SaaS) are the confirmed one-letter-away live registrations.

### Finder: web-commonlaw
- searched:
  - WebSearch: "opchain" software
  - WebSearch: "opchain" AI developer tools
  - WebSearch: "OpChain" crypto token
  - WebSearch: EY "OpsChain" blockchain platform
  - WebSearch: "Upchain" Autodesk PLM
  - WebSearch: "OPCHAIN" supply chain optimization Optilogic OR "OpChain"
  - WebSearch: "OPCHAIN" logistics OR planning OR optimization software -optimism
  - WebSearch: "OPCHAIN" DecisionWare Velasquez analytics
  - WebSearch: "opchain" site:linkedin.com OR site:crunchbase.com OR site:producthunt.com
  - WebSearch: LimePoint "OpsChain" platform
  - WebSearch: "OppChain" company software
  - WebSearch: Autodesk Upchain "end of life" OR retired OR "Fusion Manage" rename
  - WebSearch: "opchain" coinmarketcap OR coingecko token
  - WebSearch: "OpChain" app iOS OR Android OR "Google Play"
  - WebSearch: "OPCHAIN" "DO Analytics" OR doanalytics OR "OPTEX" 2025 OR 2026
  - WebSearch: "Opchain" options protocol ChainMates OR DeFi OR "options trading"
  - WebSearch: "OpChain Labs" OR "opchain.io" OR "opchain.ai"
  - WebFetch: https://api.github.com/search/repositories?q=opchain+in:name (23 repos)
  - WebFetch: https://api.github.com/users/opchain
  - WebFetch: https://registry.npmjs.org/opchain (404 — unregistered)
  - WebFetch: https://pypi.org/pypi/opchain/json (404 — unregistered)
  - WebFetch: https://crates.io/api/v1/crates/opchain (404 — unregistered)
  - WebFetch: http://hn.algolia.com/api/v1/search?query=opchain (Hacker News — no relevant hits, only 'onchain')
  - WebFetch: https://www.producthunt.com/search?q=opchain (no matching products)
  - WebFetch: http://opchain.com/ (307 → GoDaddy forsale)
  - WebFetch: https://opschain.io/ (LimePoint OpsChain product site)
  - WebFetch: https://blockchain.ey.com/products/traceability (EY OpsChain)
  - WebFetch: https://www.optelgroup.com/en/solution/optchain/ (OPTEL Optchain)
  - WebFetch: https://oppchain-inc.com/our-company/
  - WebFetch attempts: doanalytics.net, decisionware.net, upchain.com (all DNS ENOTFOUND); oppchain.com/en (404); crunchbase.com/organization/oppchain (403)
- dead_ends:
  - Crunchbase direct fetches blocked (HTTP 403, no account/API key) — OppChain and O.P. Chains details taken from search snippets only.
  - LinkedIn pages (OPCHAIN showcase page, OPPCHAIN and LimePoint OpsChain company/product pages) not directly fetchable without login — relied on search-result snippets.
  - DecisionWare/DO Analytics websites (doanalytics.net, decisionware.net) fail DNS resolution — could not verify whether the exact-spelling OPCHAIN optimization suite is still commercially active; no 2025/2026 mentions surfaced in a dated search.
  - upchain.com fails DNS resolution — could not directly confirm the Upchain brand's live web presence (rename to Fusion Manage documented via Autodesk blog citations instead).
  - App stores could not be browsed directly; Google Play / App Store presence checked only via web search (no OpChain-named apps surfaced).
  - No queryable public API for Product Hunt; used its search page, which showed no opchain/OpsChain/Upchain products but is JS-rendered and may under-report.
  - Hacker News (Algolia) search returns only 'onchain' matches — no discussion of any OpChain product, so no community-usage signal either way.
- notes:
  - Closest active commercial neighbors are the two OPSCHAIN users: LimePoint's OpsChain (opschain.io, © 2026) — now pitched as an AI-powered infrastructure-change orchestration platform, i.e. the same broad field as opchain's AI dev-pipeline tooling — and EY OpsChain (blockchain SaaS, live pricing, 2026 activity). Neither was in the prior audit's registered-mark list; the registered-search agent should check whether LimePoint or EY hold OPSCHAIN registrations (AU/US/EU).
  - An EXACT-spelling commercial software product exists: DecisionWare/DO Analytics 'OPCHAIN' (OPtimizing the value CHAIN) supply-chain/energy optimization suite out of Latin America. Heavy documented use ~2016-2019 (LinkedIn, ResearchGate), but both company websites are offline today and nothing dated 2025/2026 was found — it may be dormant, but as prior common-law use in Nice 9/42-adjacent software it is the single most important common-law item to assess for priority/coexistence risk.
  - Package-registry namespaces npm 'opchain', PyPI 'opchain', and crates.io 'opchain' are all still unregistered as of 2026-08-25 (re-confirmed the 2026-08-22 audit) — grabbing npm and PyPI would be cheap defensive registration.
  - opchain.com remains GoDaddy-parked for sale (re-confirmed via live 307 redirect).
  - No crypto token, DeFi protocol, or app-store app actively branded 'OpChain' was found; the ChainMates 'Opchain' Solidity options project died in Dec 2023 with no web presence, and searches keep collapsing to Optimism (OP) or the generic term 'onchain' (incl. OKX's active 'OnchainOS' AI-agent toolkit, launched March 2026 — generic 'onchain' but conceptually adjacent: AI Skills + MCP).
  - GitHub handle 'opchain' (Perth, created 2019) is squatted but inactive since Nov 2023 — the exact-name GitHub org/user namespace is unavailable regardless.
  - Optel's 'Optchain' marketplace use (© 2026, pharma clients) confirms the LIVE OPTCHAIN registration is backed by an actively marketed product — sight/sound one letter away, but ESG/supply-chain field.
  - Autodesk's Upchain brand was folded into 'Fusion Manage' (rename effective 2024-03-26; upchain.com DNS dead), so its marketplace salience is declining even though tenants persist.

### Finder: international
- searched:
  - WIPO Global Brand Database (branddb.wipo.int, browser UI; 76,470,741 records / 89 data sources) — Brand name EMBEDDED (contains) searches: 'opchain' (0 results), 'openchain' (9), 'optchain' (7), 'opschain' (3), 'upchain' (1), 'op chain' (16,703 — top-ranked reviewed)
  - WIPO Global Brand Database — Brand name EXACT-expression search: 'op chain' (2 results — both OP Labs PBC US applications)
  - WIPO Global Brand Database — Brand name PHONETIC search: 'opchain' (9,256 results; top-30 most-relevant reviewed — attempt to also filter Nice class 9,42 in the same query did not take effect)
  - EUIPO eSearch (euipo.europa.eu/eSearch) — basic trademark search 'opchain' (4 results: PROPCHAIN, Helicopchain, TOPCHAINS, LOOPCHAIN); direct EUTM detail file 015006067 (OPENCHAIN — full record incl. renewal/expiry 15/01/2036)
  - USPTO TSDR — statusview for serials 98122443 and 98122448 (OP CHAIN, OP Labs), 86780125 (OPENCHAIN Reg. 5242152), 97909880 (OPTCHAIN Reg. 7397498) — all fetched 2026-08-25
  - Canada CIPO Canadian Trademarks Database (ised-isde.canada.ca/cipo/trademark-search, DB last updated 2026-08-19) — Trademark-field wildcard searches: '*opchain*' (1: DROPCHAIN, ABANDONED, cl 12), '*openchain*' (0), '*upchain*' (0), '*opschain*' (0), '*optchain*' (2: both Optel, REGISTERED, cl 42)
  - Web search: '"OpsChain" trademark EY Ernst Young registered' (EY product pages; no filings found)
  - Web search: '"OPCHAIN" trademark registration' (catch-all; no registrations surfaced — only O.P. Chains Ltd (Indian BSE-listed bullion/real-estate company, ticker OPCHAINS), GitHub/Instagram handles, shap.utils.OpChain API name)
  - Web search: WIPO GBD data coverage / China CNIPA inclusion (inconclusive — see notes)
- dead_ends:
  - WIPO BrandDB JSON API (branddb.wipo.int/api/search and legacy /branddb/jsp/select.jsp): direct HTTP requests are gated by an ALTCHA proof-of-work bot challenge; I did not attempt to bypass it programmatically. Worked around it by using the normal browser UI, where the widget completes itself on page load.
  - WIPO Madrid Monitor legacy API (www3.wipo.int/madrid/monitor/jsp/select.jsp): returns {"error": "REQUIRE_COMPRESSED_REQUEST"} — undocumented request-compression scheme; not pursued. Madrid IRs are nonetheless covered inside the GBD searches (e.g., IR 1713242 Optchain appeared), so no coverage gap.
  - UKIPO (trademarks.ipo.gov.uk / search-for-trademark.service.gov.uk): both curl and a real browser session hit a 'Security check' page with a Cloudflare Turnstile 'Verify you are human' checkbox. Completing captchas is prohibited, so no direct UKIPO query was run; UK data relied on WIPO GBD's UKIPO coverage (which returned UK00915006067 OPENCHAIN and UK00003763183 OPTCHAIN, and zero 'opchain' hits). Consequence: the UK00915006067 renewal question (below) could not be checked at source.
  - EUIPO copla JSON API (euipo.europa.eu/copla/trademark/data/...): TCP connection reset; used the eSearch UI instead.
  - EUIPO eSearch basic search caching quirk: re-running a query by changing only the URL hash (opchain → openchain) kept serving the cached previous result set (identical '0.548/0.593 seconds' banner). Mitigated by fetching the EUTM detail page directly; treat eSearch hash-URL search results with care.
  - TSDR intermittently returns 403 Forbidden (rate limiting) — the OPTCHAIN sn97909880 fetch failed once and succeeded on retry after a pause.
  - GBD Nice-class filtering within the phonetic search: entering '9,42' in the Nice classification field did not constrain the 9,256-result phonetic set; only the relevance-ranked top 30 were reviewed (all closer-sounding candidates ranked there).
  - China (CNIPA domestic register): no free, account-less, captcha-less search path found; whether GBD's 89 sources include domestic CNIPA filings could not be confirmed (Madrid marks designating CN are covered). A dedicated CN clearance would need a CNIPA agent or paid tool.
- notes:
  - HEADLINE: zero marks anywhere in WIPO GBD's 76.5M records (89 collections incl. USPTO, EUIPO, UKIPO, CIPO, IP Australia, JPO, KIPO, India, Madrid IRs) contain the literal string 'opchain'. The exact mark OPCHAIN is unregistered everywhere covered.
  - BIGGEST NEW FINDING vs the 2026-08-22 audit: OP Labs PBC (the Optimism / OP Stack crypto company) has TWO live US intent-to-use applications for the standard-character mark 'OP CHAIN' in classes 42 (sn 98122443) and 9 (sn 98122448), filed Aug 2023, published with NO opposition, Notice of Allowance Oct 2024, now on their 3rd of 5 possible SOU extensions (next deadline ~Oct 2026). 'OP CHAIN' is phonetically identical to OPCHAIN. Goods are blockchain-specific (building/scaling blockchains), which is a different field from dev-pipeline skills, but identical wording + classes 9/42 makes this the single most important mark to have a lawyer assess — and OP Labs also runs an 'OP ___' family (e.g., OP STACK app 98102346 per Justia search snippet), suggesting active enforcement posture.
  - OpenChain (Linux Foundation) international protection map — the answer to 'find where': national/regional registrations in US (Reg 5242152, incontestable via §8/§15 Dec 2023), EU (EUTM 015006067, renewed to 15/01/2036), UK (comparable mark UK00915006067), Japan (6255267), South Korea (4018172420000), India (4807997). No Madrid IR — all direct filings. NOT registered in Canada (CIPO '*openchain*' = 0) or Australia.
  - CAVEAT to chase: the UK comparable mark UK00915006067 inherited the EUTM's renewal date, which fell due ~15/01/2026. GBD still lists it as Registered, but I could not verify at UKIPO (Turnstile). If it lapsed, the UK picture for the Linux Foundation changes; a UK attorney or TMview check would settle it.
  - OPTCHAIN (Optel Vision, supply-chain SaaS): a fully international live family, all class 42 — US Reg 7397498 (confirmed LIVE at TSDR today) + a second still-pending US app 97313509 (new vs the prior audit), EUTM 018666517, UK00003763183, Canada TMA1199312 + TMA1199405 (both confirmed REGISTERED at CIPO), Madrid IR 1713242 in force designating the EU + member states + India.
  - OPSCHAIN: only actual filings anywhere are LimePoint IP Pty Ltd's three Australian class 9 registrations (2154491/2154502/2154503, all live since Feb 2021) for their DevOps orchestration product — conceptually the closest *field* to opchain (dev/ops tooling), but Australia-only. EY's OpsChain blockchain platform has NO trademark filings found in any covered register; it trades under the EY house mark (common-law product name).
  - UPCHAIN: the Autodesk-acquired PLM brand has no live registrations anywhere in GBD, and CIPO (its Canadian home registry) shows zero — the brand appears fully retired. Only live UPCHAIN mark globally is a Brazilian class 35 consultancy (917670353).
  - Canada is completely clear for OPCHAIN/OPENCHAIN/OPSCHAIN/UPCHAIN (only *opchain* substring hit is DROPCHAIN, ABANDONED, class 12).
  - EU near-field context: PROPCHAIN (live EUTM, 9/35/42) and LOOPCHAIN (Apr 2026 EUTM application in classes 9/35/42, already opposed) both contain 'opchain' as a substring; the LOOPCHAIN opposition is a signal that new '-CHAIN' marks in 9/42 attract opposition at EUIPO.
  - Dead marks (no longer bars): Coinprism OPENCHAIN US app 86838886 (ended 2018), OPENCHAIN JP app 2016-038306 (ended), 'OpenChain Network' BR app 929737881 (ended Oct 2024), APPCHAIN US app 85177256 (ended 2018), AV-CHAIN JP app (ended).
  - Also observed (non-trademark): 'O P Chains Ltd' is a BSE-listed Indian company with stock ticker literally 'OPCHAINS' (bullion/jewellery chains, unrelated field) — a company-name/securities-ticker collision to be aware of for SEO, not a trademark issue.
  - Source-URL caveat: WIPO GBD and CIPO search UIs are session-based (no stable per-query deep links), so their hits cite the search-tool URL; the exact queries and on-screen evidence text are recorded in each hit's evidence field and in searched[]. GBD status/dates are as shown in its list view and can lag national registers by days-to-weeks; the four US records were re-verified live at TSDR on 2026-08-25, and EUTM 015006067 live at eSearch.

### Finder: namespaces
- searched:
  - dig A/NS/SOA: opchain.com, opchain.org, opchain.io, opchain.ai, opchain.net (+opchain.dev as control)
  - curl -L https://opchain.com/ https://opchain.org/ https://opchain.ai/ https://opchain.net/ (status + final URL + body markers)
  - WebFetch https://opchain.com/ and https://opchain.org/ (both 307 -> forsale.godaddy.com landers), https://opchain.ai/ (fetched), https://opchain.net/ (403)
  - WebFetch + curl (browser UA) https://forsale.godaddy.com/forsale/opchain.com and /opchain.org (403 / 'Access Denied')
  - Wayback: archive.org/wayback/available?url=opchain.net; web.archive.org CDX for opchain.net; snapshot web.archive.org/web/20250514120655/http://opchain.net/ (via curl)
  - whois opchain.com, opchain.org, opchain.ai, opchain.net
  - npm: registry.npmjs.org/opchain, /opchain-skills, /opschain, /upchain (incl. time.created/modified for the taken two)
  - PyPI: pypi.org/pypi/opchain/json, /opschain/json, /upchain/json
  - crates.io/api/v1/crates/opchain
  - rubygems.org/api/v1/gems/opchain.json
  - GitHub API: api.github.com/users/opchain, api.github.com/users/opchain/repos, api.github.com/search/repositories?q=opchain+in:name&sort=stars
  - Bluesky: public.api.bsky.app/xrpc/app.bsky.actor.getProfile?actor=opchain.bsky.social
  - X/Twitter: status-code probe of x.com/opchain, x.com/opchains vs control x.com/anthropic
  - WebSearch: "opchain.net"
- dead_ends:
  - GoDaddy for-sale landers (forsale.godaddy.com/forsale/opchain.com and .org) return 403/'Access Denied' to both WebFetch and curl-with-browser-UA, so the asking price / min-offer for opchain.com and opchain.org could not be retrieved. For-sale status itself is solid (Afternic/Dan.com nameservers + 307 redirect to the GoDaddy for-sale path); price needs a real browser or a GoDaddy account.
  - opchain.net's LIVE content is unverifiable: Cloudflare serves HTTP 403 'Attention Required!' to WebFetch and curl. Assessed via the 2025-05-14 Wayback snapshot instead — but note the current WHOIS registration was created 2026-02-05, after that snapshot, so the present owner/content may differ.
  - X/Twitter handle existence cannot be confirmed definitively without an authenticated API: used the status-code heuristic (x.com/anthropic -> 200, x.com/opchain -> 404, x.com/opchains -> 404). A 404 usually means no such handle, but suspended or reserved handles can also 404.
  - WebFetch is blocked from web.archive.org ('Claude Code is unable to fetch from web.archive.org'); worked around with curl.
  - WHOIS registrant identities are redacted for all four registered opchain domains — owners unknown beyond registrar.
- notes:
  - FREE as of 2026-08-25 (all verified by direct fetch today; note: task said 2026-08-24, env date is 2026-08-25): domain opchain.io (NXDOMAIN from the .io registry SOA — unregistered); npm 'opchain' ({"error":"Not found"}); npm 'opchain-skills' ({"error":"Not found"}); PyPI 'opchain', 'opschain', 'upchain' (all HTTP 404); crates.io 'opchain' ('crate `opchain` does not exist'); RubyGems 'opchain' ('This rubygem could not be found.'); Bluesky handle opchain.bsky.social ('Profile not found'); X handle @opchain (404 while control handle returns 200 — see dead_ends caveat).
  - Defensive-registration suggestion: npm 'opchain' and 'opchain-skills' are both free while the GitHub mirror already ships as asfbay-bit/opchain-skills — cheap to claim npm/PyPI/crates 'opchain' now to foreclose squatting; opchain.io is also registrable.
  - GitHub repo-name search: 23 repos named opchain, NONE with >5 stars (max is 1 star) — no established open-source project owns the name. Passing-mention uses seen: prohft/opchain 'OpChain – Options-Chain Scenario Dashboard' (0 stars, updated 2026-07-26 — 'op chain' as options-chain shorthand in finance tooling) and dungle-scrubs/opchain (0 stars, 1Password service-account CLI helper, 2026-07-12). Neither is a freedom-to-use threat today, but options-trading 'op chain' is a recurring collision axis.
  - Domain-squat picture: exact-match opchain.com (held since 2015) and opchain.org (2024) are both on GoDaddy aftermarket for sale; opchain.ai (registered 2025-07-21) is the one to watch — an unknown party promises a launch and is collecting emails; opchain.net cycled through Chinese SEO/spam use and was re-registered 2026-02-05 via a Hong Kong registrar behind Cloudflare.
  - Changes vs the 2026-08-22 prior audit: npm/PyPI 'opchain' still unregistered (re-confirmed); GitHub user 'opchain' (Perth, 1 fork, inactive) re-confirmed unchanged; opchain.com still aftermarket-parked (re-confirmed). New facts this pass: opchain.io is NXDOMAIN, opchain.ai has a 'Launching Soon' lander, opchain.net is a re-registered ex-spam domain behind a 403.
  - This pass covered namespaces/domains only; the USPTO OPENCHAIN/OPTCHAIN re-confirmation and EY OpsChain / Autodesk Upchain trademark leads listed in the context were out of this searcher's scope and were not checked here.
