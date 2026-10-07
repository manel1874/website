# Manuel's personal website

A six-page static website (Work, Research, Blogposts, Code, Education, Contact) with expandable work experience and independent topic filters for research articles, blog posts, and coding projects. One system font, no framework, no runtime dependencies, no analytics, and no external font requests.

## Run locally

Requires Node.js 20 or newer. No package installation is needed.

```sh
npm run dev
```

Open http://localhost:4173. After editing, rerun `npm run build` and refresh the browser. `PORT=8080 npm start` selects another local port.

## Build and host

```sh
npm run build
```

Deploy the contents of `dist/` to any static host. All asset paths are relative, so the site also works under a GitHub Pages repository path. GitHub Pages publishes the site at https://manel1874.github.io/website/. Pushing to `main` runs `.github/workflows/pages.yml`, builds the site, and deploys `dist/`.

## Edit content

- `content.json`: articles, theses, reports, blog posts, and projects. Each entry has a title, URL, optional year/venue/description, topic array, and optional related links. Projects also have a `languages` array.
- `scripts/build.mjs`: work experience and page generation.
- `template.html`: shared navigation and content sections, split into six HTML pages by the build.
- `public/styles.css`: typography, colours, and responsive layout.
- `public/app.js`: independent topic and language filters with shareable URLs, such as `?research-topic=MPC&projects-language=Rust`.
- `public/Manuel_CV.pdf`: downloadable CV.
- `public/manuel-portrait.png`: portrait reused from the Potomaq presentation assets.

Supported topics: `MPC`, `ZK`, `FHE`, `AI`, and `Quantum`. Entries can have more than one topic. The blog-post filter uses `Post-quantum` instead of `Quantum`. Research and project Quantum topics include post-quantum cryptography. Research also includes a `Maths` topic for the Lyapunov paper. Entries with an empty topic array appear under All topics. Each collection has its own topic selection on its page. Coding projects form one continuous list and can also be filtered by language; the language and topic selections work together. Theses sit under their degrees on the Education page, followed by Scholarships. Technical reports sit below articles on the Research page and remain visible independently of its filter.

The build renders all content into HTML. Without JavaScript the full bibliography and native job disclosures still work; the filters are hidden.

## Content provenance and editorial notes

The GitHub profile at https://github.com/manel1874/manel1874 supplied the section structure and complete publication, blog, thesis, report, and coding-project lists (papers refreshed 7 October 2026). The supplied CV added roles, education, awards, and five further projects. Work summaries for Tectonic and MultiVM Labs also draw on the local work notes provided by Manuel. Internal source documents are not part of the website output.

The dedicated PhD Projects, YouTube videos, and choir recordings sections are omitted. Research papers and code developed during the PhD remain, following the distinction in the original profile.

Fission and TLShare use the distinct ePrint URLs in the GitHub profile, correcting duplicated Curl links in the CV. The MSc thesis uses the arXiv link from the profile rather than the PhD PDF link in the LaTeX CV.

The October 2026 refresh incorporates both the AI and cryptography CV sources from the supplied Manuel_CV folder. The cryptography CV supplies the Tectonic title and dates (October 2025 to March 2026), MultiVM start date (April 2026), and concrete protocol, implementation, and audit contributions. The downloadable CV is now the supplied `manuel-cv.pdf` from that folder.

Archived blog destinations are labelled “Wayback Machine”. Offline posts with no discovered capture remain listed without a clickable title. Their original URLs remain in `content.json` for future recovery. See `content-review.md` for the link audit and source reconciliation.
