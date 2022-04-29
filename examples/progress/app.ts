import np from 'nprogress'
import 'nprogress/nprogress.css'
import axios from '../../src'
const instance = axios.create();
function calcPercentage(loaded: number, total: number) {
    return Math.floor(loaded) / total
}

function loadProgressBar() {

    // 启动前
    function setupStartProgress() {
        instance.interceptor.request.use(config => {
            np.start()
            return config
        })
    }
    // 启动中
    function setupUpdateProgress() {
        const update = (e: ProgressEvent) => {
            console.log(e)
            np.set(calcPercentage(e.loaded, e.total))
        }
        instance.defaults.onDownloadProgress = update
        instance.defaults.onUploadProgress = update
    }
    // 启动后
    function setupStopProgress() {
        instance.interceptor.response.use(res => {
            np.done();
            return res;
        }, error => {
            np.done()
            return Promise.reject(error)
        })
    }
    setupStartProgress()
    setupUpdateProgress()
    setupStopProgress()
}
// 初始化进度条
loadProgressBar()
const downloadEl = document.getElementById('download');
// 监听Download按钮点击事件

downloadEl.addEventListener('click', e => {
    instance.get('https://cdn.chime.me/image/fs/sitebuild/2022429/0/original_20b200a9-b1da-4d60-ac9c-36a216f24c88.png')
})

const uploadEl = document.getElementById('upload');
// 监听Upload按你点击事件
uploadEl.addEventListener('click', e => {
    const data = new FormData();
    const inputEl = document.getElementById('file') as HTMLInputElement;
    if (inputEl.files) {
        data.append('file', inputEl.files[0])
        instance.post('/progress/upload', data)
    }
})