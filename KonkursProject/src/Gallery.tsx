import {Swiper, SwiperSlide} from "swiper/react";
import {useState} from "react";
import {Pagination} from "swiper/modules";


interface Images {
    Image: string;
}

export default function Gallery() {
    const [images] = useState<Images[]>([]);

    return (
        <div className="bg-[url(assets/BgRound.svg)] bg-no-repeat bg-center bg-size-[80%]" style={{ height: 'calc(100% - 5rem)' }}>
            <Swiper
                pagination={{
                    type: 'fraction',
                }}
                modules={[Pagination]}
                className="!h-[85%] opacity-90 !p-10"
            >
                {images.map((image) => (
                    <SwiperSlide>
                        <img src={image.Image} alt=""/>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex h-[15%] justify-center items-center">
                <button className="bg-amber-400 pl-10 pr-10 pt-2 pb-2 rounded-3xl text-black text-xl m-auto cursor-pointer">хочузаписаться</button>
            </div>
        </div>
    )
}