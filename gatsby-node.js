var path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const fauna = require('faunadb')
const q = fauna.query


exports.onCreatePage = async ({page,actions})=>{

    const {createPage} = actions

    if(page.path.match(/^\/VirtualLolly/)){
        page.matchPath = "/VirtualLolly/*"
        createPage(page)
    }
}
