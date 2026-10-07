import { readFile, mkdir, writeFile, cp } from 'node:fs/promises';
const content = JSON.parse(await readFile(new URL('../content.json', import.meta.url), 'utf8'));
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const link = (label, url, cls = '') => `<a class="${cls}" href="${esc(url)}">${esc(label)}</a>`;
function entries(key, items = content[key]) {
  return items.map(e => `<li class="entry" data-topics="${e.topics.join(' ')}" data-languages="${esc(JSON.stringify(e.languages || []))}">
    <div class="entry-top">${e.unavailable ? `<span class="entry-title">${esc(e.title)}</span>` : `<a class="entry-title" href="${esc(e.url)}">${esc(e.title)}</a>`}${e.year ? `<span class="year">${e.year}</span>` : ''}</div>
    ${e.description ? `<p class="entry-description">${esc(e.description)}</p>` : ''}
    ${e.languages?.length ? `<p class="entry-languages">${esc(e.languages.join(' · '))}</p>` : ''}
    <div class="entry-meta">${e.venue ? `<span>${esc(e.venue)}</span>` : ''}${e.access ? `<span>${esc(e.access)}</span>` : ''}${e.unavailable ? `<span>Original offline · archive not found</span>` : ''}${e.topics.length ? `<span class="topics">${e.topics.join(' / ')}</span>` : ''}${(e.links || []).filter(l => l.url !== e.url).map(l => link(l.label, l.url)).join('')}</div>
  </li>`).join('\n');
}
function filters(id, title, key) {
 const topics = ['All','MPC','ZK','FHE','AI',key === 'posts' ? 'Post-quantum' : 'Quantum'];
 if (key === 'articles') topics.push('Maths');
 const languages = [...new Set(content[key].flatMap(e => e.languages || []))].sort();
 return `<div class="topic-filter" hidden><div class="filter-heading">Explore by topic</div><div class="filter-buttons" role="group" aria-label="Filter ${title.toLowerCase()} by topic">${topics.map(topic => `<button type="button" data-topic="${topic}" aria-pressed="${topic === 'All'}">${topic === 'All' ? 'All topics' : topic}</button>`).join('')}</div>${key === 'projects' ? `<div class="language-filter"><label for="${id}-language">Coding language</label><select id="${id}-language" data-language><option value="All">All languages</option>${languages.map(language => `<option value="${esc(language)}">${esc(language)}</option>`).join('')}</select></div>` : ''}<p class="sr-only filter-status" role="status" aria-live="polite"></p></div>`;
}
function collection(id, title, key, intro = '', after = '') {
 return `<section id="${id}" class="section collection" aria-labelledby="${id}-title"><div class="section-label"><h2 id="${id}-title">${title}</h2><span class="count" aria-label="${content[key].length} entries">${String(content[key].length).padStart(2,'0')}</span></div><div class="section-body">${intro}${filters(id,title,key)}<ul class="entries filter-entries">${entries(key)}</ul><p class="empty" hidden>No ${title.toLowerCase()} match these filters.</p>${after}</div></section>`;
}
const group = (title, items) => `<div class="work-topic"><h3>${title}</h3><ul>${items.map(item => `<li>${item}</li>`).join('')}</ul></div>`;
const jobs = [
 {company:'MultiVM Labs',url:'https://www.multivmlabs.com/',role:'Lead Cryptography Researcher',date:'Apr 2026 - Present',text:'Post-quantum cryptography, threshold signatures, and quantum cryptanalysis.',details:`${group('Cryptographic design', [
 'Helped design cryptographic agility at the consensus layer for the Quantum L1, including migration between signature schemes.',
 'Implement threshold post-quantum signatures and design TEE co-signer architectures for hybrid signing.'
 ])}${group('Audits & standards', [
 'Conduct quantum-readiness audits for Tether and Canton.',
 'Participate in the NIST NCCoE project.'
 ])}${group('Research', [
 `Help build the quantum cryptanalysis team at ${link('Potomaq','https://www.potomaq.com/')}.`,
 `Research quantum circuits for elliptic-curve cryptanalysis, including the point-addition work in ${link('ECDSA.Fail','https://arxiv.org/html/2609.09582')} and ${link('Efficient Record-and-Replay Arithmetic','https://arxiv.org/abs/2609.28882')}.`
 ])}`},
 {company:'Tectonic Labs',url:'https://tectonic.xyz/',role:'Cryptography Research Engineer',date:'Oct 2025 - Mar 2026',text:'Post-quantum wallets, blockchain migration, and protocol engineering.',details:`${group('Cryptographic design & engineering', [
 `Implemented ${link('Mithril','https://github.com/tectonic-labs/thmldsa-rs')}, a threshold post-quantum ML-DSA signing protocol.`,
 `Designed and implemented ${link('hybrid hierarchical deterministic wallets','https://web.archive.org/web/20260521082738/https://www.tectonic.xyz/blog/hybrid-hierarchical-deterministic-wallets/')} (archived article), including specification work and hybrid HD support in Rust. Maintained Bedrock’s post-quantum cryptography library.`,
 'Contributed deterministic methods in liboqs, WebAssembly compatibility in liboqs-rust, and tests for Python bindings.',
 `Contributed to SLIPs standards with a ${link('proposal to add ML-DSA post-quantum signatures to SLIP-0010','https://github.com/satoshilabs/slips/pull/1968')}.`
 ])}${group('Audits & standards', [
 'Conducted a quantum-readiness audit for 0G.',
 'Developed an AI-based internal quantum-readiness audit toolkit extending CBOMkit, helping define the audit product.',
 'Conducted internal security assessments of PQWallet and patched four high-risk and six medium-risk findings.',
 'Participated in the NIST NCCoE project and its discussions, including giving a presentation on cryptographic agility in blockchains.'
 ])}${group('Research', [
 `Conducted research on cryptographic agility in blockchains, leading to our ${link('MAgiCS 2026 paper','https://eprint.iacr.org/2026/609')}.`,
 'Researched post-quantum peer-to-peer handshakes and threshold signatures.'
 ])}`},
 {company:'Nillion Labs',url:'https://nillion.com/',role:'Cryptography Engineer',date:'May 2023 - Aug 2025',text:'MPC protocols, authenticated private computation, and private AI inference.',details:`${group('Cryptographic design & engineering', [
 `Implemented cryptographic protocols in nilVM and integrated threshold signatures into ${link('Nillion','https://nillion.com/')}’s MPC backend. Contributed to the CGGMP ECDSA upgrade.`,
 'Contributed to Nada’s private-computation language and built its NumPy-style library, nada-numpy.',
 'Researched zkTLS integration with MPC, FHE, and TEEs. Integrated RELIC into OTLS and implemented zero-knowledge proofs and circuits for LWE encryption in TFHE-rs and emp-zk.'
 ])}${group('Private AI & research', [
 `Designed and implemented private LLM inference in PyTorch, with research published as ${link('Curl','https://eprint.iacr.org/2024/1127')} (${link('code','https://github.com/jimouris/curl')}) and ${link('Fission','https://eprint.iacr.org/2025/653')}.`,
 `Developed ${link('nilRAG','https://github.com/NillionNetwork/nilrag')} and integrated ${link('Gemma 3 and structured outputs','https://github.com/NillionNetwork/nilAI/pull/99')} into nilAI, the confidential vLLM system behind nilGPT.`,
 'Built three interactive private computation demos and studied privacy attacks on LLMs, including membership inference and input inversion.'
 ])}${group('Writing', ['Wrote 11 technical blog posts on cryptography, AI agents, and private LLM inference.'])}`},
 {company:'Telecommunication Institute',url:'https://www.it.pt/',role:'Cryptography Researcher',date:'Oct 2019 - May 2023',text:'Quantum-assisted MPC and private genomic analysis.',details:`<ul><li>Developed ${link('QuPPA','https://github.com/manel1874/private-phylogenetic-analysis')}, a system for private phylogenetic analysis combining secure multiparty computation and quantum technologies, using custom forks of MP-SPDZ and Libscapi.</li><li>Researched quantum oblivious transfer and oblivious linear evaluation alongside my PhD at Técnico.</li></ul>`},
 {company:'Tekever',url:'https://www.tekever.com/',role:'Data Scientist',date:'Nov 2018 - Sep 2019',text:'Recommendation systems for Portugal’s Trade Agency.',details:'<ul><li>Built a Python and Neo4j recommendation system to suggest export markets for Portuguese companies.</li><li>Combined unsupervised learning, association rules, and collaborative filtering.</li></ul>'},
 {company:'Tekever',url:'https://www.tekever.com/',role:'Quantum Cryptography Researcher',date:'Dec 2017 - Nov 2018',text:'Quantum technologies for secure multiparty computation and quantum cryptography.',details:`${group('Secure multiparty computation', [
 'Researched applications of quantum technologies to secure multiparty computation, working with privacy-preserving frameworks including Obliv-C and ABY.'
 ])}${group('Quantum cryptography', [
 'Worked on theoretical algorithms for quantum oblivious transfer (QOT) and quantum key distribution (QKD).',
 'Worked on a laboratory implementation of semi-quantum key distribution (Semi-QKD).'
 ])}${group('Project proposals & partnerships', [
 'Led the technical development of EU and national project proposals. Secured the PT2020 Q.DOT project for secure multiparty computation, raising €609,544 in funding.',
 'Built and led a consortium of 18 international institutions. Established research partnerships with organisations including Thales, Imperial College London, and Fraunhofer HHI.'
 ])}`}
];
const jobHtml = jobs.map(j => `<details class="job"><summary><span class="job-heading">${link(j.company, j.url, 'company')}<span class="job-date">${j.date}</span></span><span class="job-role">${j.role}</span><span class="job-description">${j.text}</span><span class="toggle" aria-hidden="true"></span></summary><div class="job-detail">${j.details}</div></details>`).join('');
const degrees = [
 {title:'PhD in Information Security',year:'2025',institution:'Técnico, University of Lisbon',url:'https://tecnico.ulisboa.pt/en/',grade:'Distinction',description:'Quantum-assisted secure multiparty computation. Supervised by Paulo Mateus.',thesis:0,label:'Thesis'},
 {title:'MSc in Applied Mathematics',year:'2017',institution:'Imperial College London',url:'https://www.imperial.ac.uk/',grade:'First-Class Honours',description:'Condensed matter theory. Supervised by Ryan Barnett.',thesis:1,label:'Thesis'},
 {title:'BSc in Applied Mathematics and Computation',year:'2016',institution:'Técnico, University of Lisbon',url:'https://tecnico.ulisboa.pt/en/',grade:'17/20',description:'',thesis:2,label:'Course project'}
];
const education = degrees.map(d => `<li class="entry"><div class="entry-top"><h3>${d.title}</h3><span class="year">${d.year}</span></div><p class="entry-description">${link(d.institution,d.url)} · ${d.grade}</p>${d.description ? `<p class="entry-meta">${d.description}</p>` : ''}<p class="degree-thesis">${d.label}: ${link(content.theses[d.thesis].title,content.theses[d.thesis].url)}</p></li>`).join('');
const template = await readFile(new URL('../template.html', import.meta.url), 'utf8');
let html = template.replace('{{jobs}}', jobHtml).replace('{{articles}}',collection('research','Research','articles','<h3 class="collection-heading">Articles</h3>',`<section id="reports" class="subsection" aria-labelledby="reports-title"><h3 id="reports-title">Technical reports</h3><ul class="entries compact">${entries('reports')}</ul></section>`)).replace('{{education}}', education).replace('{{posts}}',collection('writing','Blogposts','posts')).replace('{{projects}}',collection('projects','Code','projects'));
if (html.includes('—')) throw new Error('Em dash found');
await mkdir(new URL('../dist/', import.meta.url), {recursive:true});
await cp(new URL('../public/', import.meta.url),new URL('../dist/', import.meta.url),{recursive:true});
const pages = [
 {id:'experience',file:'index',title:'Work'},
 {id:'research',file:'research',title:'Research'},
 {id:'writing',file:'blogposts',title:'Blogposts'},
 {id:'projects',file:'code',title:'Code'},
 {id:'education',file:'education',title:'Education'},
 {id:'contact',file:'contact',title:'Contact'}
];
const mainStart = html.indexOf('<main id="main">') + '<main id="main">'.length;
const mainEnd = html.indexOf('</main>');
const intro = html.slice(mainStart,html.indexOf('<section id="experience"'));
for (const [i,page] of pages.entries()) {
 const start = html.indexOf(`<section id="${page.id}"`);
 const end = i + 1 < pages.length ? html.indexOf(`<section id="${pages[i+1].id}"`) : mainEnd;
 let pageHtml = html.slice(0,mainStart) + (i === 0 ? intro : '') + html.slice(start,end) + html.slice(mainEnd);
 pageHtml = pageHtml.replace(/<title>.*?<\/title>/,`<title>${page.title} · Manuel Batalha dos Santos</title>`)
   .replace(`<a href="./${page.file}.html">${page.title}</a>`,`<a href="./${page.file}.html" aria-current="page">${page.title}</a>`);
 await writeFile(new URL(`../dist/${page.file}.html`, import.meta.url),pageHtml);
}
console.log(`Built website: ${content.articles.length} articles, ${content.posts.length} posts, ${content.projects.length} projects.`);
