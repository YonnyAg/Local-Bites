import Layout  from "../../Components/Layout"
import Carousel from '../../Components/Carousel';
import CarouselWithCategories from '../../Components/CarouselWithCategories';

function home() {
    return (
        <Layout>
            <Carousel />
            <CarouselWithCategories />
        </Layout>
    )
}

export default home