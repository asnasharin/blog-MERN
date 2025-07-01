import Navbar from '../../components/Navbar/Navbar'
import Banner from "../../components/Banner/Banner"
import LatestBlogs from '../../components/LatestBlog/LatestBlog'

function HomePage() {
  return (
   <>
   <Navbar />
   <Banner />
   <LatestBlogs />
   </>
  )
}

export default HomePage