const readline = require('readline')
const axios = require('axios')

const {URL, CLIENT_ID, CLIENT_SECRET} = require("./config")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.clear()

async function getMovieList(answer) {
    if (answer === null) {
        console.log("검색어를 입력해주세요")
        rl.close()
        return
    }

    const response = await axios.get(`${URL}?query=${encodeURI(answer)}`, {
        headers: {
            "X-Naver-Client-Id": CLIENT_ID,
            "X-Naver-Client-Secret": CLIENT_SECRET
        }
    })

    if (response.status !== 200) {
        console.log("오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
        rl.close()
        return
    }

    for (const item of response.data.items) {
        console.log('-------------------------------------------------')
        let title = item.title.replace("<b>", "")
        title = title.replace("</b>", "")
        console.log('제목: ', title)
        console.log("감독: ", item.director)
        console.log("출연 배우: ", item.actor)
        console.log("평점: ", item.userRating)

    }
    rl.close()
}

rl.question("영화 검색어를 입력해주세요.\n>", getMovieList);
