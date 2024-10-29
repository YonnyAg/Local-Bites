import Layout  from "../../Components/Layout"
import Carousel from '../../Components/Carousel';
import HomeCarouselFood  from "../../Components/HomeCarouselFood";
import Cards from '../../Components/HomeCards'

function home() {
    return (
        <Layout>
            <Carousel />
            <Cards />
            <HomeCarouselFood />
        </Layout>
    )
}

export default home