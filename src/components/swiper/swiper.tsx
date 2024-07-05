import { Swiper, SwiperClass } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { A11y, Pagination, Scrollbar } from 'swiper/modules';
import styles from './swiper.module.scss'
import { useEffect, useState } from 'react';

type SwiperComponentProps = {
  children: JSX.Element
  length: number
  seeCards: number
  changeActiveIndex?: (newIndex: number) => void
  displayPagination?: boolean
}

export default function SwiperComponent({ children, length, seeCards, changeActiveIndex, displayPagination}: SwiperComponentProps) {
  const [swiperRef, setSwiperRef] = useState<SwiperClass>();
  const [isLastSlide, setIsLastSlide] = useState(!(seeCards < length))
  const [isFirstSlide, setIsFirstSlide] = useState(!(seeCards > 1 && length > 1))

  const changeSlide = () => {
    if (!swiperRef){
      return
    }
    setIsFirstSlide(swiperRef.activeIndex === 0)
    setIsLastSlide(swiperRef.isEnd)
    if (changeActiveIndex){
      changeActiveIndex(swiperRef.activeIndex)
    }
  }

  useEffect(()=>{
    if (!swiperRef){
      return
    }
    swiperRef.activeIndex = seeCards > 1 && length > 1 ? 1 : 0
    setIsLastSlide(!(seeCards < length))
    setIsFirstSlide(!(seeCards > 1 && length > 1))
  },[length, seeCards, swiperRef])

  return (
    <>
      <Swiper
        key={length}
        modules={[Pagination, Scrollbar, A11y]}
        slidesPerView={seeCards}
        spaceBetween={20}
        initialSlide={seeCards > 1 && length > 1 ? 1 : 0}
        centeredSlides={true}
        onSwiper={(swiper) => {setSwiperRef(swiper)}}
        onSlideChange={()=>{changeSlide()}}
        autoHeight={true}
        pagination={{
          clickable: displayPagination,
          clickableClass: styles.pagination,
          bulletClass: styles.bullet,
          bulletActiveClass: styles.bullet_active
        }}
        autoplay={{ delay:2000 }}
        className={styles.swiper}
      >
        {children}
        {!displayPagination && 
        <div className={styles.navigation}>
          <svg
            onClick={() => { swiperRef?.slidePrev(); changeSlide() }}
            className={`${styles.navigationSvg} ${isFirstSlide ? styles.navigationSvg_disable : ''}`}
            width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25.0002" r="25" fill={isFirstSlide ? "#D6D6D6" : "black"} />
            <path d="M12.2929 24.2931C11.9024 24.6837 11.9024 25.3168 12.2929 25.7074L18.6569 32.0713C19.0474 32.4618 19.6805 32.4618 20.0711 32.0713C20.4616 31.6808 20.4616 31.0476 20.0711 30.6571L14.4142 25.0002L20.0711 19.3434C20.4616 18.9529 20.4616 18.3197 20.0711 17.9292C19.6805 17.5387 19.0474 17.5387 18.6569 17.9292L12.2929 24.2931ZM13 26.0002H37V24.0002H13V26.0002Z" fill="white" />
          </svg>
          <svg
            onClick={() => { swiperRef?.slideNext(); changeSlide() }}
            className={`${styles.navigationSvg} ${isLastSlide ? styles.navigationSvg_disable : ''}`}
            width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="25" cy="25" r="25" transform="matrix(-1 0 0 1 50 0.000244141)" fill={isLastSlide ? "#D6D6D6" : "black"} />
            <path d="M37.7071 24.2931C38.0976 24.6837 38.0976 25.3168 37.7071 25.7074L31.3431 32.0713C30.9526 32.4618 30.3195 32.4618 29.9289 32.0713C29.5384 31.6808 29.5384 31.0476 29.9289 30.6571L35.5858 25.0002L29.9289 19.3434C29.5384 18.9529 29.5384 18.3197 29.9289 17.9292C30.3195 17.5387 30.9526 17.5387 31.3431 17.9292L37.7071 24.2931ZM37 26.0002H13V24.0002H37V26.0002Z" fill="white" />
          </svg>
        </div>}
      </Swiper>
    </>
  )
}