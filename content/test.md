# Průvodce moderní AI architekturou, základní pojmy

Zatímco uživatelské rozhraní AI nástrojů je stále jednodušší, technologie v pozadí je komplexnější a výkonnější než kdy dříve. Pro ty, kteří chtějí skutečně pochopit, jak vytvořit robustní a inteligentní aplikace, je nezbytné znát klíčové architektonické koncepty. V tomto článku se podíváme na základní stavební bloky moderních AI systémů a vysvětlíme, jak spolupracují.

---

### Klíčové technologie a jejich role v AI architektuře

Následující pojmy představují páteř většiny pokročilých AI aplikací, se kterými se dnes setkáváte.

#### 1. Velký jazykový model (LLM – Large Language Model)
* **Technická definice:** `LLM` je rozsáhlá neuronová síť, obvykle postavená na architektuře Transformer, která je trénovaná na masivních objemech textových dat. Její schopností je zpracovávat a generovat sekvence slov (nebo přesněji tokenů) na základě pravděpodobnostních vzorců naučených z trénovacích dat. Výkon a schopnosti modelu se často odvíjí od počtu jeho parametrů, které mohou dosahovat stovek miliard.
* **Jak to funguje:** Model přijme vstupní text (prompt), převede jej na matematickou reprezentaci a na základě svého natrénovaného stavu predikuje nejpravděpodobnější následující slovo (token). Tento proces se opakuje, dokud není vygenerována kompletní odpověď.
* **Byznysový kontext:** `LLM` je samotný "motor" pro generování textu, shrnutí, analýzu sentimentu nebo překlady. Může fungovat samostatně (např. jako webové rozhraní ChatGPT), ale jeho skutečná síla v byznysu spočívá v jeho propojení s dalšími systémy.

#### 2. RAG (Retrieval-Augmented Generation)
* **Technická definice:** `RAG` je architektura, která kombinuje předtrénovaný `LLM` s externím vyhledávacím mechanismem. Místo toho, aby se model spoléhal pouze na své interní (a často zastaralé) znalosti, nejprve vyhledá relevantní informace v externí databázi a tyto informace pak použije jako kontext pro generování přesnější a aktuálnější odpovědi.
* **Jak to funguje:**
    1.  **Retrieval (Vyhledání):** Uživatelův dotaz je použit k prohledání externí znalostní báze (např. firemní dokumentace, produktové manuály, interní předpisy apod.).
    2.  **Augmentation (Obohacení):** Nalezené relevantní úryvky textu jsou připojeny k původnímu dotazu a společně tvoří nový, obohacený prompt.
    3.  **Generation (Generování):** Tento obohacený prompt je odeslán do `LLM`, který na jeho základě vygeneruje odpověď, jež je fakticky podložená poskytnutými daty.
* **Byznysový kontext:** `RAG` je klíčová technologie pro tvorbu firemních chatbotů a asistentů. Umožňuje AI odpovídat na dotazy ohledně vašich konkrétních produktů, interních směrnic nebo zákaznických dat, čímž eliminuje problém "halucinací" a zajišťuje, že odpovědi jsou vždy relevantní a pravdivé.

#### 3. Vektorová databáze (Vector Database)
* **Technická definice:** Jde o specializovaný typ databáze navržený pro ukládání a efektivní prohledávání dat ve formě vysokodimenzionálních vektorů (tzv. *embeddings*). Vektor je číselná reprezentace sémantického významu dat (slov, vět, obrázků).
* **Jak to funguje:** Když do databáze uložíte dokument, AI model jej nejprve převede na vektor ("číselný otisk významu"). Při dotazu je i ten převeden na vektor a databáze bleskově vyhledá nejbližší (nejpodobnější) vektory z uložených dat pomocí algoritmů jako ANN (*Approximate Nearest Neighbor*). Právě tato databáze je oním "vyhledávacím mechanismem" v architektuře `RAG`.
* **Byznysový kontext:** Pokud chcete implementovat `RAG`, potřebujete vektorovou databázi. Je to úložiště pro vaši firemní znalostní bázi, které umožňuje AI bleskově najít relevantní informace pro jakýkoliv dotaz.

#### 4. AI agenti
* **Technická definice:** `AI agent` je autonomní systém, který vnímá své prostředí, samostatně plánuje sled kroků a používá dostupné nástroje (např. volání `API`, prohledávání webu) k dosažení předem definovaného cíle. Na rozdíl od pasivních `LLM` modelů, které fungují na principu **dotaz -> odpověď**, agenti proaktivně jednají, rozhodují se a adaptují svůj postup na základě nových informací.
* **Jak to funguje:** Agent operuje v cyklu **vnímej -> rozhoduj se -> jednej**. Nejprve zanalyzuje aktuální stav a cíl. Poté jeho řídící `LLM` (mozek agenta) naplánuje další krok – například použít konkrétní nástroj nebo položit doplňující otázku. Následně tuto akci provede, vyhodnotí výsledek a celý cyklus opakuje, dokud není úkol splněn.
* **Byznysový kontext:** AI agenti představují velký evoluční stupeň automatizace. Umožňují automatizovat komplexní vícekrokové procesy, jako je kupř. organizace služební cesty, správa zákaznických požadavků napříč několika systémy, proaktivní monitoring a řešení problémů v IT infrastruktuře apod. Agent je v podstatě takový "digitální zaměstanec", který výrazně napomáhá zaměstancům skutečným a v některým případech je může i plně nahradit.

#### 5. MCP (Model Context Protocol)
* **Technická definice:** `MCP` je otevřený standardizovaný protokol, který umožňuje jednotný způsob, jakým  komunikovat s AI modely. Poskytuje strukturovaný formát pro předávání nejen uživatelských vstupů a odpovědí modelu, ale také kontextových informací, nástrojů, zdrojů dat a výsledků volání. Cílem je zajistit interoperabilitu a předcházet ztrátě důležitých informací během komplexních interakcí.
* **Jak to funguje:** Namísto prostého posílání textových promptů definuje `MCP` výměnu strukturovaných objektů (typicky JSON), které obsahují zprávy, stavové informace, výsledky z nástrojů nebo API a další metadata. Díky tomu model (nebo agent) dostává při každém kroku kompletní kontext a může přesněji navazovat na předchozí dění.
* **Byznysový kontext:** `MCP` je zásadní pro vývoj víceagentních a nástrojově orientovaných systémů – například složité plánování cest, asistenty pro vývojáře nebo podnikové workflow. Standardizovaný protokol usnadňuje propojení různých komponent a umožňuje, aby si agenti mezi sebou efektivně a spolehlivě předávali informace.


#### 6. Mixture of Experts (MoE)
* **Technická definice:** Zkratka `MoE` odkazuje na architekturu **Mixture of Experts (MoE)**, která je v poslední době klíčová pro škálování `LLM`. `MoE` je typ neuronové sítě, kde místo jednoho obřího monolitického modelu existuje několik menších, specializovaných sub-modelů ("expertů") a komponenta, která rozhoduje, kterého experta pro daný úkol vybrat.
* **Jak to funguje:** Při zpracování se vybere jen mala podmnožina nejrelevantnějších expertů. Ostatní zůstanou neaktivní. Díky tomu je model při zachování obrovského počtu parametrů výpočetně mnohem efektivnější a jeho provoz je levnější.
* **Byznysový kontext:** Modely jako Mixtral 8x7B od Mistral AI nebo modely Gemini od Googlu využívají `MoE`, aby dosáhly špičkového výkonu s nižšími provozními náklady a vyšší rychlostí než tradiční modely. Pro firmy to znamená přístup k výkonnějším modelům za příznivější cenu.

#### 6. API (Application Programming Interface)
* **Technická definice:** `API` je definované rozhraní, které umožňuje různým softwarovým komponentám vzájemně komunikovat. Funguje jako "smlouva", která specifikuje, jak mají požadavky vypadat, a jaké odpovědi lze  očekávat. V kontextu AI se nejčastěji jedná o webové `API` (REST nebo gRPC), kde komunikace probíhá přes HTTP požadavky a data jsou formátována např. v JSON.
* **Jak to funguje:** Váš systém odešle na specifickou adresu AI poskytovatele HTTP požadavek, který v těle obsahuje váš dotaz a konfigurační parametry. Server poskytovatele požadavek zpracuje pomocí svého `LLM` a v HTTP odpovědi vrátí vygenerovaný text.
* **Byznysový kontext:** `API` je brána, skrze kterou lze integrovat AI na další komponenty - kupř. do firemních webových stránek. Je to standardizovaný a škálovatelný způsob, jak využít výkonné modely, aniž byste museli budovat a udržovat vlastní složitou infrastrukturu.

### Závěr

Tyto technologie netvoří izolované ostrovy, ale propojený ekosystém. Moderní AI aplikace typicky využívá **API** k volání **LLM**, který je vylepšen **RAG** architekturou čerpající data z **vektorové databáze**. Pro pokročilé autonomní systémy pak nastupují **AI agenti**, kteří pro spolehlivou komunikaci mohou využívat protokoly jako **MCP**. Pochopení této souhry je klíčem k návrhu a implementaci skutečně inteligentních a pro byznys přínosných řešení.