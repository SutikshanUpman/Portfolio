# Sutikshan Upman - Portfolio

Personal portfolio for a Computer Science and Engineering student at IIIT Nagpur, featuring backend development and machine learning projects.

The website uses HTML5, CSS3, Bootstrap 5.3.3, and JavaScript. Bootstrap is included locally. The homepage runs directly in a browser or through a static HTTP server. Three separate backend demonstrations are included under `projects/`.

## Run locally

From PowerShell, run the following commands and open http://127.0.0.1:8081.

```powershell
Set-Location 'X:\Portfolio'
python -m http.server 8081 --bind 127.0.0.1
```

The Node.js, database, and Docker setup commands for the backend demonstrations are in [the demo setup guide](docs/coursework.md). Those services run separately from the portfolio website.

## Project structure

```text
Portfolio/
  index.html
  style.css
  script.js
  bootstrap.min.css
  bootstrap.bundle.min.js
  projects/
    student-api/
    course-enrollment/
    task-manager/
  docs/
    coursework.md
  outputs/
  README.md
```

`index.html` contains the portfolio content. `style.css` controls its appearance. `script.js` currently updates the footer year. The `outputs/` folder contains the original practical test reports and Git history bundle.

## Phase 1 - Make the project and content personal

### Completed organization

- [x] Move the portfolio's five website files to the repository root.
- [x] Rename the backend folders using descriptive project names.
- [x] Replace the coursework introduction with this portfolio README.
- [x] Move the demo setup instructions to `docs/coursework.md` and update their paths.
- [x] Rename the two Postman collections to Student Management API and Course Enrollment API.
- [x] Update the temporary-data ignore rule for the nested demo folders.

| Previous location | Current location |
| --- | --- |
| M4_P1_Portfolio/index.html and its four assets | Repository root |
| M3_P1_Student_API | projects/student-api |
| M3_P2_Course_Enrollment | projects/course-enrollment |
| M4_P2_Task_Manager | projects/task-manager |
| Coursework README.md | docs/coursework.md |

### Content work

- [ ] Confirm the final introduction and preferred role description. The current hero introduces web applications and machine learning systems.
- [ ] Check the education and internship details against the current resume. The page currently states CGPA 8.74, graduation in 2028, and the May-July 2026 AI internship.
- [ ] Add a current downloadable resume and link it from the introduction or contact section. A resume download is currently absent.
- [ ] Expand each selected project with the problem solved, personal contribution, and one relevant outcome supported by the resume or repository. The current project descriptions are brief.
- [ ] Identify the individual contribution to Resolv while retaining its four-person team attribution and existing repository owner.
- [ ] Verify the RecruiterEye repository, GitHub profile, LinkedIn profile, and contact email manually. Automated fetching was inconclusive for those web pages.
- [ ] Recheck all public project and demo links after the content changes.

The Chest X-ray and Resolv repository pages were accessible during the audit on 16 November 2026. These are the current project sources. [Chest X-ray repository](https://github.com/SutikshanUpman/Chest-Xray-Pneumonia-Detection), [Resolv repository](https://github.com/rajveer1421/resolv-).

Phase 1 is complete when every displayed claim matches the chosen resume and every project has a clear contribution and working source link.

## Phase 2 - Improve the page and verify its behavior

- [ ] Make the collapsed mobile navigation close after selecting a section. The current JavaScript only updates the year, so the menu stays expanded until it is toggled again.
- [ ] Add a keyboard-accessible skip link to the main content.
- [ ] Check keyboard focus, tab order, navigation toggling, contact links, and section anchor positions.
- [ ] Resolve the font choice. The CSS declares Inter without loading it, so rendering currently depends on installed fonts and its Arial fallback.
- [ ] Check layouts at approximately 360, 768, and 1440 pixels, including the long name, email address, and project titles. Resolve any overflow or awkward wrapping found.
- [ ] Verify text and link contrast after choosing the final colors, along with visible focus states.
- [ ] Confirm all five sections, the current footer year, Bootstrap assets, and reduced-motion behavior in the browser.
- [ ] Complete visual checks in desktop and mobile layouts. Previous verification covered source files and HTTP responses. Full visual and interactive browser checks remain pending.

Phase 2 is complete when the page works with touch and keyboard, reads clearly at each tested width, and loads its local assets successfully.

## Phase 3 - Prepare and publish the portfolio

- [x] Choose the source repository at https://github.com/SutikshanUpman/Portfolio.
- [ ] Choose the final hosting URL.
- [x] Configure `origin` as `https://github.com/SutikshanUpman/Portfolio.git`.
- [x] Configure commits as `SutikshanUpman <s.upman.mat@gmail.com>`.
- [x] Review the demo files and exclude generated task data and installed dependencies from the source commit.
- [ ] Finalize the page title and description for the chosen professional focus. Add the canonical URL and social preview metadata after the public URL is known, with a favicon and preview image if prepared.
- [ ] Configure GitHub Pages to serve the root of the publishing branch.
- [ ] Open the deployed URL and verify the homepage, styles, navigation, project links, email link, and resume download over HTTPS.
- [ ] Record the final public URL and update local launch instructions if the layout changes.

Check the repository configuration with these commands.

```powershell
git remote -v
git status --short
```

The repository root now contains the static website entry point. The backend demonstrations require separate Node.js/database hosting when a live API demo is desired.

Phase 3 is complete when the public portfolio URL works and the README points to it. GitHub Pages deployment is pending.
