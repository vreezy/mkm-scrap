# mkm-scrap

## Installation

- install [node LTS](https://nodejs.org/en/)

- install [Git](https://git-scm.com/downloads)

- start command line

- go to c:

`cd c:\`

- create folder "projects"

`mkdir projects`

- move to folder

`cd projects`

- clone project

`git clone https://github.com/vreezy/mkm-scrap.git`

- move to the new folder

`cd mkm-scrap`

- install dependencies

`npm install`

- rename `./src/urls.example.ts`to `urls.ts`

`ren src/urls.example.ts urls.ts`

- start scrap

`npm run scrap`

- open explorer and open Excel.xlst

`explorer .`

- OR start excel from command line

`start excel "excel.xlsx"`

---

## Add Cards

- install [Visual Studio Code](https://code.visualstudio.com/download),

- start Visual Studio Code,

- Open the "mkm-scrap" FOLDER (not a file),

- rename `./scr/urls.example.ts` to `urls.ts`

- Open in Visual Studio Code the `./scr/urls.ts` file by selecting it in the "EXPLORER" window on the left,

- Edit the `urls` array on the top and add more urls like the scheme u see.

- Hint: every line needs a comma except the last one. Escape the urls with `"` -> `"url"`.

- save your changes!

---

## Run from CMD

- close the Excel file! If it open it can't be writen

- open command line and move to the "mkm-scrap" folder

`cd c:\projects\mkm-scrap`

- start scrap

`npm run scrap`

---

## Run from Visual Studio

- close the Excel file! If it open it can't be writen.

- in the "EXPLORER" window is a NPM-SKRIPTS section on the bottom.

- expand it.

- Start "scrap" by pressing the RUN Button.

---

## Update Code

- delete code changes (backup your urls!)

`git stash`

- get the new code

`git pull`
