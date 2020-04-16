const util = require('util');
const exec = util.promisify(require('child_process').exec);
const headers = {
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7',
};
let url = 'http://localhost:8983/solr/techproducts/select?q=*%3A*';
//         http://localhost:8983/solr/techproducts/select?q=*%3A*
(
    async function () {
        let {stdout, stderr} = await exec(`curl -X GET ${url} -L -H "User-Agent: ${headers['User-Agent']}" -H "Accept-Language: ${headers['Accept-Language']}" -H "Accept: ${headers['Accept']}"`);
        let objJson = JSON.parse(stdout);
        // console.log(objJson.response.docs);
        let arr = [];
        let obj = {};
        for( let i= 1; i < objJson.response.docs.length; i++) {
            obj.position = objJson.response.docs[i].position[0];
            obj.positionLink = objJson.response.docs[i].positionLink[0];
            arr.push(obj)
        }
        console.log(arr)
    }
)();
