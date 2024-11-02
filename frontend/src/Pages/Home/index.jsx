import Layout  from "../../Components/Layout"
import Carousel from '../../Components/Carousel';
import HomeCarouselFood  from "../../Components/HomeCarouselFood";

function home() {
    return (
        <Layout>
            <Carousel />
            <HomeCarouselFood />
        </Layout>
    )
}

export default home