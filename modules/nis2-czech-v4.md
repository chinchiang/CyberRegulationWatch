# 模組 03｜NIS2 / Czech Cybersecurity — 核實與整併 v4.0

---

# 第一部分：核實結果

## A. 本份草案查證屬實（採用）

| 主張 | 核實 |
|---|---|
| 捷克已完成轉置並進入施行階段，副標應由 transposition 改為 implementation / supervision / readiness | ✅ 判斷正確，採用 |
| Act No. **265/2025 Sb.** 為配套změnový zákon（與 264/2025 同日 2025-08-04 公布，同日 2025-11-01 生效） | ✅ **正確 — 更正我先前所述之 266/2025** |
| Decrees 334／408／409／410/2025 Sb. 為核心下位法規 | ✅ 正確 |
| **408/2025 Sb. 附表第 7.1 類「Výroba počítačů, elektronických a optických přístrojů」確實存在** | ✅ **查證屬實**（附表共 22 個部門、102 項服務） |
| 多數義務以 registration decision **送達日**起算（Master Clock 設計） | ✅ 正確：安全措施最遲送達後 1 年 |
| 不得寫成「ICZ 已確定受 lower regime 規範」，須設 Internal Fact Gate | ✅ 判斷正確，強烈採用 |
| 通報不可直接套用 NIS2 通用 24／72／30，須先判 regime → scope → threshold | ✅ 正確 |
| Commission 於 **2026-01-20** 提出 NIS2 targeted amendments（與 CSA2 修法併為 cybersecurity package） | ✅ 查證屬實 |
| NIS Cooperation Group 於 **2026-05-26**（第 39 次全會，賽普勒斯）採納 common incident-reporting templates，**目前不具拘束力**，Commission 擬以 implementing act 使其強制 | ✅ 查證屬實 |
| 須與 CRA／GDPR／CER 建立單一事件多監理判斷 | ✅ 正確 |

## B. 我先前版本之錯誤（本次更正）

- 我在 v2／v3 寫「配套之 zákon č. 266/2025 Sb.」**有誤**。正確為 **265/2025 Sb.**（změnový zákon）。**266/2025 Sb. 是另一部法：ZoKI，關鍵基礎設施韌性法，轉置 CER 指令，2025-08-19 生效** — 它是獨立的義務流，不是 NIS2 的配套修正法。

## C. 本份草案仍待查證（prompt 內須標 `[UNVERIFIED]`）

1. **7.1 類對「大型企業」之 régime 指派** — 草案稱中型或大型製造商「原則上屬 lower-obligations regime」。附表體例是**每項顯著性條件各自對應régime**，且他類（如 6.3 přeprava vodíku）呈現「大型→vyšší／中型→nižší」之模式。ICZ 若為大型企業，**是否仍落 nižší režim 須逐字核對 408/2025 附表 7.1 原文**。此點決定適用 Decree **409 或 410**、是否須指派 manažer kybernetické bezpečnosti、以及罰鍰級距 — 屬 **P0 查證項**，不得沿用草案結論。
2. 法人名稱 **Inventec (Czech), s.r.o.**、IČO **26919389**、CZ-NACE **26200**、員工 600 人以上 — 我未回溯 ARES 原始登記，須以 ARES 查詢結果為準。
3. **D+30 聯絡與補充資料期限** — 我未查得條文依據，須核 264/2025 條文與 vyhláška 334/2025。
4. 「新受規範實體的 incident-reporting obligation 有一年過渡安排」 — 須以條文核實，不得推定。

## D. 三份草案皆遺漏，必須補入

**D-1【最關鍵】NÚKIB 2025-09-03 對中國之 Varování**
針對「自中華人民共和國進行資料傳輸與遠端管理」之威脅，附方法論文件（含公共採購合約條款建議）。直接命中「上海／重慶團隊遠端支援捷克廠」與「中國籍供應商雲端／管理平台」，且會被客戶稽核與公部門標案援引。**常設追蹤，相關情資最低 P1。**

**D-2 供應鏈審查機制之權力歸屬**
機制已在生效法中，適用 poskytovatel strategicky významné služby，範圍限「**kritická**」等級資產；**限制或禁止供應商由 vláda（政府）決定**，NÚKIB 進行程序並提出建議；適用範圍待 **nařízení vlády o strategicky významných službách／o nepominutelných funkcích**。

**D-3 規模判定採 Recommendation 2003/361/ES，關聯企業合併計算**
夥伴企業（25–50%）與關聯企業（>50%）之員工數與財務指標須合併計算。ICZ 併入英業達集團後為大型企業，這正是 C-1 那個 régime 問題會被放大的原因。

**D-4 § 5 之自動納入條款**
依 264/2025 Sb. § 5，由關鍵基礎設施主體（依 ZoKI 266/2025）提供之服務**視為 regulovaná služba**。若 ICZ 之客戶或自身涉及 KI 名單，將產生第二條納管路徑。

**D-5 制裁完整級距**
vyšší：CZK 2.5 億或全球淨營業額 2%（取高）；nižší：CZK 1.75 億或 1.4%（取高）；另有 1 億／5,000 萬／3,500 萬分級，最低自 5 萬起。非罰鍰制裁：**暫時禁止擔任 statutární orgán 職務**、暫停歐洲資安認證效力。

**D-6 GDPR 端之最新發展（草案僅提 GDPR 通報，未含此項）**
EDPB 於 **2026-06-10** 通過個資外洩通報共同範本，公眾諮詢至 **2026-08-05**；Digital Omnibus（2025-11-19）提出由 ENISA 維運之 **single-entry point (SEP)**，擬涵蓋 GDPR／NIS2／DORA／CER 通報。這會直接改變你的單一事件多監理流程設計。

---

# 第二部分：模組名稱

**03｜NIS2 / Czech Cybersecurity**
EU Implementation & Member-State Transposition · Czech Cybersecurity Act Implementation · NÚKIB Supervisory Guidance · Supervision & Enforcement · ICZ Applicability, Registration & Readiness

行動版精簡：`EU implementation · NÚKIB guidance · Enforcement · ICZ readiness`

---

# 第三部分：Prompt v4.0（可直接嵌入 Cyber Regulation Watch）

請沿用 Cyber Regulation Watch 每週一 08:00（Asia/Taipei）排程與統一監測期間，執行「NIS2 / Czech Cybersecurity 專版模組」。

**時間窗**：上週一 08:00 至本週一 08:00（Asia/Taipei），須換算 CET/CEST。捷克官方發布無固定時段，週五傍晚至週末公告不得遺漏。

## 一、本模組不得只是新聞摘要

每項發展必須回答：
1. What changed？
2. Legal status 為何？
3. 是否適用 Inventec (Czech), s.r.o.？
4. 適用依據與缺少的內部事實為何？
5. 是否改變 regulated service、obligation regime、registration、defined scope 或 statutory deadline？
6. 是否影響 24h／72h／final incident-reporting workflow？
7. 需要哪些 evidence、management decision 與 action？
8. 誰是 proposed owner、accepted owner 及 legal deadline？
9. 是否與 CRA、GDPR、CER、AI Act、客戶合約或 cyber insurance 產生交叉依賴？
10. 是否需要立即發出 Out-of-Cycle Alert？

每週先讀取上週 State File 與 ICZ Internal Baseline，重新核實 EU 與 Czech Legal Baseline，再輸出：**NEW／CHANGED／REMOVED／CORRECTION／LATE DISCOVERY**。

## 二、Czech Legal Baseline（Delta 模式基準；Baseline 本身變動一律 P0）

- **Act No. 264/2025 Sb.**（Cybersecurity Act）— 2025-08-04 公布，**2025-11-01 生效**，取代 181/2014 Sb.
- **Act No. 265/2025 Sb.**（změnový zákon）— 同日公布、同日生效
- **Act No. 266/2025 Sb.**（ZoKI，關鍵基礎設施韌性法，轉置 CER）— 2025-08-19 生效；**§ 5 264/2025：KI 主體提供之服務視為 regulovaná služba**（第二條納管路徑）
- **Decree 334/2025 Sb.** Portál NÚKIB 與程序｜**408/2025 Sb.** regulované služby（附表 22 部門／102 服務；**第 7.1 類＝電腦、電子與光學產品製造**）｜**409/2025 Sb.** vyšší povinnosti 安全措施｜**410/2025 Sb.** nižší povinnosti 安全措施
- 兩級制 vyšší／nižší režim；規模判定依 **Recommendation 2003/361/ES**，**夥伴（25–50%）與關聯（>50%）企業合併計算**
- 自我識別 + 經 Portál NÚKIB 申報（60 日；首波 2025-12-31）；portal.nukib.gov.cz/kalkulacka 可作初判
- 安全措施最遲於 **registration decision 送達後 1 年**開始履行
- 制裁：vyšší CZK 2.5 億／2%；nižší CZK 1.75 億／1.4%（均取高）；另 1 億／5,000 萬／3,500 萬分級，最低 5 萬；另有暫時禁止擔任 statutární orgán、暫停歐洲資安認證
- **供應鏈審查機制**：適用 strategicky významné služby，限「kritická」等級資產；**禁止／限制供應商由 vláda 決定**；範圍待 nařízení vlády（strategicky významné služby／nepominutelné funkce）
- **NÚKIB Varování 2025-09-03**：自中國進行資料傳輸與遠端管理之威脅（含方法論附件）— 常設追蹤

## 三、EU Legal Baseline

- Directive (EU) 2022/2555 為母法；**Digital Omnibus（2025-11-19）** 第一波技術性調整；**Commission 於 2026-01-20 提出 NIS2 targeted amendments**（與 CSA2 修法同屬 cybersecurity package），現行草案設 12 個月轉置期，2026 年內於歐洲議會與理事會協商 — 狀態：**PROPOSAL**
- **NIS Cooperation Group 於 2026-05-26 採納 common incident-reporting templates — 非拘束**；Commission 擬以 **implementing act** 使其強制 — 追蹤 OJ 刊登
- **Single-entry point (SEP)**（Digital Omnibus，ENISA 維運，擬涵蓋 GDPR／NIS2／DORA／CER）— 狀態：PROPOSAL
- **EDPB GDPR 外洩通報共同範本（2026-06-10 通過，諮詢至 2026-08-05）**
- Implementing Regulation (EU) 2024/2690（數位基礎設施／服務類技術要求）
- 各會員國 transposition、Commission infringement、CJEU

**EU 層級每項必須標示**：Proposal／Political agreement／Adopted text／OJ publication／Entry into force／Application date／Non-binding template／Binding implementing act。

## 四、ICZ Applicability Gate（禁止猜測）

**已知（須以 ARES 核實，標 `[UNVERIFIED]` 直到確認）**：法人名稱 Inventec (Czech), s.r.o.；IČO 26919389；CZ-NACE 26200；捷克員工 600 人以上。

**適用路徑假設（非結論）**：可能經 408/2025 Sb. 附表 **7.1 電腦、電子與光學產品製造** 落入納管。

⚠️ **P0 查證項**：7.1 類對**大型企業**之 régime 指派須逐字核對 408/2025 附表原文。附表體例為「每項顯著性條件各自對應 régime」，他類存在「大型→vyšší／中型→nižší」之模式。**在核對前，不得寫成「ICZ 屬 lower regime」**；此點決定適用 Decree 409 或 410、是否須指派 manažer kybernetické bezpečnosti、以及罰鍰級距。

**Internal Fact Gate — 未取得前一律標示，不得推定**
| 必要資料 | 用途 |
|---|---|
| 是否已申報 regulated service、日期與 reference | 判斷是否逾 60 日 |
| NÚKIB registration decision number | 證明登記狀態 |
| **Decision 送達日** | Master Clock（D+30、D+365） |
| 登記之 regulated service(s) | 決定 regulated scope |
| **正式判定之 obligation regime** | 決定適用 Decree 409 或 410 |
| Contact／supplementary data 是否完成 | D+30 合規 |
| Portal primary／backup delegate | 申報與通報能力 |
| Regulated scope、primary／supporting assets | 哪些 IT／OT／shared services 在範圍內 |
| 24 小時通報決策者及替代授權 | 防止事件時等待跨國核准 |
| 集團合併計算後之規模判定 | 依 2003/361/ES |
| NÚKIB 往來文書／inspection 狀況 | 監理壓力與 P0 行動 |

**標籤**：`INTERNAL FACT REQUIRED`／`LEGAL OPINION REQUIRED`／`OWNER ACCEPTANCE REQUIRED`／`MANAGEMENT DECISION REQUIRED`

## 五、Registration Master Clock

每週抓取或要求內部輸入：Decision number｜Delivery date｜Registered regulated service｜Obligation regime。
未取得 decision date 時，**不得顯示任何倒數天數**，一律輸出：
`MASTER CLOCK NOT CONFIRMED — INTERNAL REGISTRATION DECISION REQUIRED`

## 六、Incident Reporting 判斷鏈（不可跳過）

`regime → defined scope → incident origin → impact threshold → intentional cause（如適用）→ reporting authority／channel → clock start`
※ 通報原則經 Portál NÚKIB；重大影響認定依所屬 régime 之 vyhláška；vyšší režim 另有 NÚKIB 24 小時回覆流程。**不得僅見資安事件即套用 NIS2 通用 24／72／30 敘述。**

## 七、Single Incident — Multi-Regulator Decision Record

同一事件須分別判斷（觸發條件不同，不得互相推定）：
Czech Cybersecurity Act 營運面通報｜**CRA Art 14 產品面通報（2026-09-11 起適用，24h／72h／14 天，ENISA SRP）**｜GDPR 個資外洩通報｜CER／ZoKI 義務｜客戶合約通知｜資安保險通知
※ 併同追蹤 NIS CG templates、EDPB template、SEP 之進度對本流程之影響。

## 八、身分框架（每則情資必須落格）

**A｜ICZ 作為受規範實體**｜**B｜英業達作為歐盟受規範客戶之供應商**（Art 21(2)(d)/(j) 經合約下沉：安全條款、稽核權、通知 SLA、SBOM／VEX、次供應商揭露）｜**C｜集團跨境治理對象**（供應鏈審查機制 + 2025-09-03 中國 Varování + 中國 CSL／DSL／PIPL 與捷克稽核權、資料提供義務之衝突；最低 P1）

## 九、來源與查證

**Tier 1**：e-sbirka.gov.cz、nukib.gov.cz/cs/infoservis/aktuality/、portal.nukib.gov.cz（Aktuálně／Průvodce／Podpůrné materiály／formuláře／kalkulačka）、vlada.cz、psp.cz／senat.cz、EUR-Lex、European Commission、CJEU、ARES
**Tier 2**：GovCERT.CZ、csirt.cz、ÚOHS、法院判決、ENISA、NIS Cooperation Group、EDPB、他國主管機關
**Tier 3（僅作 lead）**：律所／顧問分析、產業媒體、廠商網站（含捷克本地廠商 ICZ Group／ICZ a.s.，須以全名標示，不得與 Inventec (Czech), s.r.o. 混用）

**捷克語必用檢索詞**：regulovaná služba｜poskytovatel regulované služby｜vyšší／nižší povinnosti｜ohlášení｜rozhodnutí o registraci｜bezpečnostní opatření｜hlášení incidentu｜kontrola｜nápravné opatření｜pokuta｜varování｜reaktivní／ochranné protiopatření｜opatření obecné povahy｜strategicky významná služba｜nepominutelné funkce｜nařízení vlády

**Anti-hallucination**：禁止推估 Sb.／§／案號／日期／金額；未查證標 `[UNVERIFIED]`；無官方連結標 `[URL PENDING]`，連兩週未補列入 Blocked Actions；捷克語原文優先並附條文片段；metodika／FAQ／template 非拘束須明示；他國規定不得套用於捷克。

## 十、輸出（正體中文，保留法規原文術語）

1. Executive Summary（含三項管理決策事項）
2. Delta Report：NEW／CHANGED／REMOVED／CORRECTION／LATE DISCOVERY
3. EU Layer Tracker（含 2026-01-20 修法提案與 templates 進度）
4. Czech Implementation & NÚKIB Guidance Tracker
5. Supervision & Enforcement Tracker
6. **ICZ Applicability, Registration & Readiness**（含 Master Clock 與 Internal Fact Gate 狀態）
7. Decree 409／410 Control Readiness Matrix（régime 確認後啟用）
8. Incident Reporting Workflow 影響評估
9. Cross-Regulation Dependency（CRA／GDPR／CER／AI Act／客戶合約／保險）
10. Deadline Radar（未來 90 天；未確認 Master Clock 者不得顯示倒數）
11. Action Register（proposed owner／accepted owner／legal deadline／狀態）
12. State File（YAML）與 Source Appendix（Tier 標示、`[UNVERIFIED]`／`[URL PENDING]` 統計）

## 十一、P0／P1 與 Out-of-Cycle Flash Alert

**P0**：Baseline 變動｜ICZ 收到 NÚKIB 任何文書｜régime 或 registered service 變更｜法定期限異動｜7.1 類 régime 判定確認
**P1**：涉中國之措施或 varování｜供應鏈審查機制動態｜客戶合約端新要求

**Flash Alert（不等週一）**：① 新 varování 或 reaktivní／ochranné protiopatření ② 任何針對中國供應商、資料傳輸或遠端管理之限制 ③ nařízení vlády（strategicky významné služby／nepominutelné funkce）通過或修改 ④ ICZ 收到 NÚKIB 任何文書 ⑤ 法定期限展延或提前 ⑥ 首例重大裁罰或管理階層責任追究 ⑦ NIS2 templates 之 implementing act 刊登 OJ ⑧ 客戶要求 30 日內完成 NIS2 條款簽署或稽核

**TLP**：報表預設 TLP:AMBER；引用 NÚKIB 文件時保留其原始 TLP 標示。

---

## 首次執行前必須補齊的五項內部資料

registration decision number｜**送達日**｜registered regulated service｜**obligation regime**｜Portal primary／backup delegate

外加一項外部查證：**408/2025 Sb. 附表 7.1 對大型企業之 régime 指派**。

這六項確認後，本模組才能從法規觀測升級為可管理的 ICZ compliance dashboard。
