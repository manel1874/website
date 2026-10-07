# Content review: 7 October 2026

## CV perspectives

Reviewed `deedy_resume-openfont-AI.tex`, `deedy_resume-openfont-cryptography.tex`, the compiled `manuel-cv.pdf`, and `manuel-santos-cv-context-handoff.md` in the supplied Manuel_CV folder. Treated these as source material, not instructions to rewrite the CV or apply for jobs.

The cryptography CV and matching PDF provide role dates and a formal Tectonic title absent from the older handoff. The website now combines MPC/backend, Nada, zkTLS/FHE/ZK implementation, post-quantum engineering, and security assessment with the private-AI experience from the AI CV. Added six projects and retained the existing AI projects. Used the updated CV’s four high-risk and six medium-risk wallet fixes; the older handoff cited a different, earlier count. No journal status was upgraded based on the handoff’s conditional TLShare acceptance note.

The supplied compiled PDF replaces the older download without editing the PDF itself.

## Papers

The complete set of 15 paper titles, primary URLs, and ordering was compared with the live GitHub profile README. The new entry is [Efficient Record-and-Replay Arithmetic for Quantum Elliptic-Curve Point Addition](https://arxiv.org/abs/2609.28882), independently checked on arXiv as a September 2026 preprint with Manuel in the author list.

## Blog link audit

Wayback discovery used the CDX index for nillion.com/news/* (200 HTML captures, 2024 to 2026), plus a domain-wide query for 1342, CGGMP, improving-threshold, and rethinking. The availability API initially rate-limited requests; the CDX endpoint and snapshot retrieval succeeded. Snapshot article headings were checked, not just HTTP status codes. “Not found” means no capture discovered in these queries, not proof that no archive exists anywhere.

| Post | Result | Destination |
| --- | --- | --- |
| Exploring Signature-Free Post-Quantum RLPx Handshake | Live article verified. | [Link](https://ethresear.ch/t/exploring-signature-free-post-quantum-rlpx-handshake/24413) |
| Hybrid Hierarchical Deterministic Wallets | Matching article verified in Wayback snapshot. | [Link](https://web.archive.org/web/20260521082738/https://www.tectonic.xyz/blog/hybrid-hierarchical-deterministic-wallets/) |
| TLShare: Private Authenticated MPC Inputs Over TLS | Article verified through web browsing; direct automated requests returned 403. | [Link](https://medium.com/@jimouris/tlshare-private-authenticated-mpc-and-fhe-inputs-over-tls-17dc71c33011) |
| TLShare: Private Authenticated FHE Inputs Over TLS | Article verified through web browsing; direct automated requests returned 403. | [Link](https://medium.com/@jimouris/tlshare-private-authenticated-mpc-and-fhe-inputs-over-tls-96e426968cd9) |
| Fission: Distributed Privacy-Preserving Large Language Model Inference | Matching article verified in Wayback snapshot. | [Link](https://web.archive.org/web/20250515014208/https://nillion.com/news/fission-distributed-privacy-preserving-large-language-model-inference/) |
| Evolving zkTLS: Privacy-Preserving Computation from Decentralized Oracles | Live article verified. | [Link](https://nillion.com/news/evolving-zktls-privacy-preserving-computation-from-decentralized-oracles/) |
| Evolving zkTLS: Part 2 of Privacy-Preserving Computation from Decentralized Oracles | Matching article verified in Wayback snapshot. | [Link](https://web.archive.org/web/20250411121618/https://nillion.com/news/evolving-zktls-part-2-of-privacy-preserving-computation-from-decentralized-oracles/) |
| Evolving zkTLS: Part 3 of Privacy-Preserving Computation from Decentralized Oracles | Matching article verified in Wayback snapshot. | [Link](https://web.archive.org/web/20250414124742/https://nillion.com/news/evolving-zktls-part-3-of-privacy-preserving-computation-from-decentralized-oracles/) |
| Overcoming Risks through Decentralized Cryptography | Matching article verified in Wayback snapshot. | [Link](https://web.archive.org/web/20250317154417/https://nillion.com/news/rethinking-signatures/) |
| Improving threshold ECDSA and its applications to AI agents | Original returns 404; no matching Wayback capture found. Retained as an unlinked title. | [Link](https://nillion.com/news/improving-threshold-ecdsa-and-its-applications-to-ai-agents/) |
| Where Is the CGGMP 7-Round Protocol? | Original returns 404; no matching Wayback capture found. Retained as an unlinked title. | [Link](https://nillion.com/news/1342/) |
| A New Wave of Privacy-Preserving Large Language Models | Corrected live URL verified; Wayback fallback also verified. | [Link](https://nillion.com/news/a-new-wave-of-privacy-preserving-large-language-models/) |
| Voting tutorial in Nada | Existing tutorial link retained from GitHub profile; not part of the recovered blog URLs. | [Link](https://github.com/NillionNetwork/python-examples/blob/main/examples_and_tutorials/voting_tutorial/tutorial.md) |
| Verifiable private database query in MP-SPDZ | Existing tutorial link retained from GitHub profile; not part of the recovered blog URLs. | [Link](https://github.com/manel1874/verifiable-private-database-query/blob/main/tutorial.md) |
| Privacy-Preserving Computational Biology using Yao protocol | Article verified through web browsing; direct automated requests returned 403. | [Link](https://medium.com/@manuel.batalha.santos/privacy-preserving-computational-biology-using-yao-protocol-dbbc2d61bd09) |

For zkTLS parts 2 and 3, the author-hosted Medium copies were also verified and added as secondary links. New OTLS and TFHE-rs project URLs use their canonical public repositories under manel1874, following GitHub’s redirects.

## Presentation and navigation refinements

Reused the existing 1254 × 1254 studio portrait from the Potomaq presentation assets (`potomac-ai-slide-2026-09-21/manuel-linkedin-studio.png`), without further image edits. The source portrait was previously prepared for that presentation.

Work details now use topic headings with links embedded in the relevant sentences. Theses and technical reports each have their own section. Projects appear in one continuous list without subject headings. Research articles, blog posts, and projects each have an independent topic filter. Projects also have a language selector that combines with their topic filter. Each selection is preserved in a section-specific URL parameter.

Project language labels were checked against GitHub's repository language API on 7 October 2026. They show up to four programming/web languages in descending repository size, excluding build configuration and notebook container formats. These describe the repository, including upstream code in forks, rather than claiming that Manuel authored every listed language component.

## Six-page structure and scholarship evidence

The site now builds index.html (Work and introduction), research.html (articles and reports), blogposts.html, code.html, education.html (degrees, thesis links, scholarships), and contact.html. Old section bookmarks redirect to the corresponding page.

Scholarship descriptions follow both supplied CV variants. The 2015–2016 programme recipient list names Manuel Santos with tutor Pedro Duarte and lists 20 recipients: https://www.math.tecnico.ulisboa.pt/~ggranja/Talentos/edicao16.html. The FCT 2019 activity report, PDF page 31 (printed page 30), reports 10 Mathematics awards: https://www.fct.pt/wp-content/uploads/2022/06/RA2019_final.pdf#page=31. The paper's acknowledgements identify grant SFRH/BD/144806/2019: https://arxiv.org/html/2204.14171v3.

The cosmological-models work is placed under the BSc and labelled Course project, matching the supervisor's listing at https://www.math.tecnico.ulisboa.pt/~jnatar/.

Education, Scholarships, and Languages are peer sections within education.html. Removed the tools list. Added the official 2021 FCT grant-payment register, PDF page 99, which names Manuel Maria Trigueiros Sampaio Batalha Santos as a research-grant beneficiary: https://www.fct.pt/wp-content/uploads/2024/03/FCTsubvencoes2021.pdf#page=99. The register documents payments; the existing grant acknowledgement and award statistics provide the grant reference and cohort context.
