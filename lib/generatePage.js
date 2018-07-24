import fs from 'fs';
import path from 'path';
import Aragog from 'aragog';
import ViewRender from './render';
const viewRender = new ViewRender();
const aragog = new Aragog({
  username: 'zz1211',
  repository: 'Doraemon'
});

(async () => {
  await aragog.openPage();
  let issueList = [];
  let list = []
  let page = 1;
  do {
    list = await aragog.fetchIssueList({
      queryConditions: {
        'utf8': true,
        page: page++,
        q: ['is:issue', 'is:open', 'label:blog', '-label:TBD ']
      }
    });
    issueList = issueList.concat(list)
  } while (list.length > 0)
  fs.writeFileSync(path.resolve(process.cwd(), './issues.json'), JSON.stringify(issueList, null, 4), 'utf8');
  await aragog.closeBrowser();
  console.info('render template into page ->');
  const view = viewRender.render('index', { issueList });
  fs.writeFileSync(path.resolve(process.cwd(), './index.html'), view, 'utf8');
})()