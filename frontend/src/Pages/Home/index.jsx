import Layout  from "../../Components/Layout"
import Carousel from '../../Components/Carousel';
import HomeCarouselFood  from "../../Components/HomeCarouselFood";
import Cards from '../../Components/HomeCards'

function home() {
    return (
        <Layout>
            <h1>Inicio</h1>
            <Carousel />
            <Cards />
            <HomeCarouselFood />
        </Layout>
    )
}

export default home