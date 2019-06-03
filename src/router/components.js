// import homepage from '../components/swiper/homepage'
const homepage = resolve => require(['../components/swiper/homepage'], resolve)
// import bookdetail from '../components/bookdetail'
const bookdetail = resolve => require(['../components/bookdetail'], resolve)
// import booklist from '../components/booklist'
const booklist = resolve => require(['../components/booklist'], resolve)

const booklist2 = resolve => require(['../components/booklist2'], resolve)
// import search from '../components/search'
const search = resolve => require(['../components/search'], resolve)
// import search_detail from '../components/search_detail'
const search_detail = resolve => require(['../components/search_detail'], resolve)

const user_center = resolve => require(['../components/user_center'], resolve)

const login = resolve => require(['../components/login'], resolve)

const reader = resolve => require(['../components/reader'], resolve)

const chart = resolve => require(['../components/chart'], resolve)

const chartdetail = resolve => require(['../components/chartdetail'], resolve)

const category = resolve => require(['../components/category'], resolve)

const categorydetail = resolve => require(['../components/categorydetail'], resolve)

const special = resolve => require(['../components/special'], resolve)

const limit = resolve => require(['../components/limit'], resolve)

const specialbooklist = resolve => require(['../components/booklist_special'], resolve)

const limitbooklist = resolve => require(['../components/booklist_limit'], resolve)

const purchased = resolve => require(['../components/purchased'], resolve)

const favouritebooks = resolve => require(['../components/favouritebooks'], resolve)

const collectsubject = resolve => require(['../components/collectsubject'], resolve)

const mycurrency = resolve => require(['../components/mycurrency'], resolve)

export  default {
  homepage,
  bookdetail,
  booklist,
  booklist2,
  search,
  search_detail,
  user_center,
  login,
  reader,
  chartdetail,
  chart,
  category,
  categorydetail,
  special,
  limit,
  specialbooklist,
  limitbooklist,
  purchased,
  favouritebooks,
  collectsubject,
  mycurrency
}
