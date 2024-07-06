import styles from './app.module.scss'
import TitleBlock from './components/title-block/title-block';
import { pageLinks } from './consts/page-links'
import { staff } from './consts/staff';
import { useEffect, useState } from 'react';
import { shops } from './consts/shops';
import { Shop } from './types/shop';
import { useRef } from 'react';
import { IMaskInput } from 'react-imask';
import { SwiperSlide } from 'swiper/react';
import SwiperComponent from './components/swiper/swiper';
import { events } from './consts/events';
import { EventName } from './enums/event';
import { partners } from './consts/partners';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import useWidth from './hooks/useWidth';
import { brands } from './consts/brands';

function App() {

  const widthSize = useWidth()

  const [shopsList, setShopsList] = useState<Shop[]>(shops.map(shop => ({ ...shop, isActive: false })))
  const [isDisplayModal, setIsDisplayModal] = useState(false)
  const [filterEvents, setFilterEvents] = useState(events)

  const [activeEventsIndex, setActiveEventsIndex] = useState(1)
  const [activeEventFilter, setActiveEventFilter] = useState<string | undefined>()

  const [activePartnerIndex, setActivePartnerIndex] = useState(1)
 
  const [activePath, setActivePath] = useState('')

  const changeActiveShop = (index: number) => {
    const newShopList = [...shopsList]
    newShopList[index].isActive = !newShopList[index].isActive
    setShopsList(newShopList)
  }

  const changeFilterEvents = (name: keyof typeof EventName) => {
    setActiveEventFilter(name)
    setFilterEvents(()=>(events.filter((event)=>(event.type === name))))
    setActiveEventsIndex(1)
  }

  function sliceArray<T>(arr: T[], lengthSlice:number): T[][] {
    const chunkedArray: T[][] = [];
    for (let i = 0; i < arr.length; i += lengthSlice) {
        chunkedArray.push(arr.slice(i, i + lengthSlice));
    }
    return chunkedArray;
  }

  useEffect(() => {
    document.body.style.overflow = `${isDisplayModal ? 'hidden' : 'auto'}`
  }, [isDisplayModal])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navigation activePath={activePath} isFooter={false} changeActivePath={setActivePath}/>
      </header>
      <div className={styles.header__intro}>
          <h1 className={styles.header__h1}>Lorem ipsum dolor sit amet</h1>
          <p className={styles.header__p}>Lorem ipsum dolor sit amet, consectetur
            adipiscing elit sed do eiusmod tempor</p>
          <button onClick={() => { setIsDisplayModal(true) }} className={styles.header__button}>связаться с нами</button>
        </div>
      <main className={styles.main}>
        <div className={styles.main__about} id='about'>
          <div className={styles.main__titleBlock_about}>
            <TitleBlock name='О компании КераМир Premium' />
          </div>
          <p className={styles.main__textBlock}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className={styles.main__aboutBlocks}>
            <div className={`${styles.main__aboutBlock} ${styles.aboutBlock}`}>
              <img className={styles.aboutBlock__icon} src='icons/aboutBlock/first.svg' />
              <h4 className={styles.aboutBlock__title}>Lorem ipsum</h4>
              <p className={styles.aboutBlock__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className={`${styles.main__aboutBlock} ${styles.aboutBlock}`}>
              <img className={styles.aboutBlock__icon} src='icons/aboutBlock/second.svg' />
              <h4 className={styles.aboutBlock__title}>Lorem ipsum</h4>
              <p className={styles.aboutBlock__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
          <div className={`${styles.main__line} ${styles.main__line_disableMobile}`}></div>
          <div className={styles.main__aboutBlocks}>
            <div className={`${styles.main__aboutBlock} ${styles.aboutBlock}`}>
              <img className={styles.aboutBlock__icon} src='icons/aboutBlock/third.svg' />
              <h4 className={styles.aboutBlock__title}>Lorem ipsum</h4>
              <p className={styles.aboutBlock__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <div className={`${styles.main__aboutBlock} ${styles.aboutBlock}`}>
              <img className={styles.aboutBlock__icon} src='icons/aboutBlock/fourth.svg' />
              <h4 className={styles.aboutBlock__title}>Lorem ipsum</h4>
              <p className={styles.aboutBlock__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
        <div className={styles.main__examples}>
          {widthSize > 768 ? <>
          <img className={styles.main__example} src="examples/1.png" />
          <img className={styles.main__example} src="examples/2.png" />
          <img className={styles.main__example} src="examples/3.png" />
          <img className={styles.main__example} src="examples/4.png" />
          <img className={styles.main__example} src="examples/5.png" />
          <img className={styles.main__example} src="examples/6.png" />
          </> :
            <SwiperComponent length={6} seeCards={1} displayPagination>
              <>
                <SwiperSlide><img className={styles.main__example} src="examples/1.png" /></SwiperSlide>
                <SwiperSlide><img className={styles.main__example} src="examples/2.png" /></SwiperSlide>
                <SwiperSlide><img className={styles.main__example} src="examples/3.png" /></SwiperSlide>
                <SwiperSlide><img className={styles.main__example} src="examples/4.png" /></SwiperSlide>
                <SwiperSlide><img className={styles.main__example} src="examples/5.png" /></SwiperSlide>
                <SwiperSlide><img className={styles.main__example} src="examples/6.png" /></SwiperSlide>
              </>
            </SwiperComponent>
          }
        </div>
        <div className={styles.main__brandsBlock} id='brands'>
          <div className={styles.main__titleBlock}>
            <TitleBlock name='Бренды' />
          </div>
          <div className={styles.main__line}></div>
          <SwiperComponent length={Math.ceil(brands.length / widthSize > 768 ? 10 : 5)} seeCards={1}>
            <>
              {sliceArray(brands, widthSize > 768 ? 10 : 5).map((el, index) => (
                <SwiperSlide
                  key={`${el}--${index}`}
                  className={styles.main__brandBlock}
                >
                  <div className={styles.main__brands}>
                    {el.map((value) => (
                      <img className={styles.main__brand} src={`brands/${widthSize < 1210 ? 'mobile' : 'desktop'}/${value}`} />))}
                  </div>
                  {widthSize > 768 && <div className={styles.main__line}></div>}
                </SwiperSlide>
              ))}
            </>
          </SwiperComponent>
          {widthSize > 768 || <div className={styles.main__brands_mobileMargin}><div className={styles.main__line}></div></div>}
        </div>
        <div className={styles.main__services} id='services'>
          <div className={styles.main__titleBlock}>
            <TitleBlock name='Услуги' />
          </div>
          <div className={styles.main__servicesBlock}>
            <div className={`${styles.main__service} ${styles.service}`}>
              <span className={styles.card__span}>Бесплатно</span>
              <h3 className={styles.card__title}>3D дизайн-проект</h3>
              <p className={styles.card__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <button className={styles.service__button}>оставить заявку</button>
            </div>
            <div className={styles.service__mobileLine}></div>
            <div className={styles.service__verticalLine}></div>
            <div className={`${styles.main__service} ${styles.service}`}>
              <span className={styles.card__span}>Замеры бесплатно</span>
              <h3 className={styles.card__title}>Монтаж</h3>
              <p className={styles.card__text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <button className={styles.service__button}>оставить заявку</button>
            </div>
          </div>
        </div>
        <div className={`${styles.main__events} ${styles.events}`} id='events'>
          <div className={styles.main__titleBlock}>
            <TitleBlock name='События' />
          </div>
          <div className={styles.events__tabs}>
            <p 
              key={'archive'} 
              onClick={()=>{changeFilterEvents('archive')}} 
              className={`${styles.events__tab} ${activeEventFilter === 'archive' ? styles.events__tab_active : ''}`}>
              #Архив мероприятий
            </p>
            <p 
              key={'future'} 
              onClick={()=>{changeFilterEvents('future')}} 
              className={`${styles.events__tab} ${activeEventFilter === 'future' ? styles.events__tab_active : ''}`}>
              #Будущие мероприятия
            </p>
            <p 
              key={'news'} 
              onClick={()=>{changeFilterEvents('news')}} 
              className={`${styles.events__tab} ${activeEventFilter === 'news' ? styles.events__tab_active : ''}`}>
              #Новости
            </p>
            <p 
              key={'contests'} 
              onClick={()=>{changeFilterEvents('contests')}} 
              className={`${styles.events__tab} ${activeEventFilter === 'contests' ? styles.events__tab_active : ''}`}>
              #Конкурсы
            </p>
          </div>
          <div className={styles.main__cards}>
            <SwiperComponent  
              changeActiveIndex={setActiveEventsIndex} 
              length={widthSize > 961 ? filterEvents.length : Math.ceil(filterEvents.length / 3)} 
              seeCards={widthSize > 961 ? 3 : 1}>
              <>
                {widthSize > 961 ?  filterEvents.map((event, index) => (
                  <SwiperSlide key={`${event.title}--${index}`}>
                    <div 
                      style={{ backgroundImage: `url(${event.img})` }} 
                      className={`${styles.main__card} 
                        ${styles.card_background} ${styles.card} ${activeEventsIndex === index ? styles.card_active : ''}`}>
                      <div className={styles.card__paddingBlock}>
                        <span className={`${styles.card__span} ${styles.card__span_absolute}`}>{EventName[event.type]}</span>
                        <h3 className={styles.card__title}>{event.title}</h3>
                        <p className={styles.card__text}>{event.text}</p>
                        <a href={event.href}><img className={styles.card__arrow} src='icons/arrow-link.svg' /></a>
                      </div>
                    </div>
                  </SwiperSlide>
                )) : 
                sliceArray(filterEvents, 3).map((arr, index)=>(
                  <SwiperSlide key={`${index}`}>
                    <div className={styles.main__cardsMobileBlock}>
                      {arr.map((event, index)=>(
                        <div 
                        key={`${event.title}--${index}`}
                        style={{ backgroundImage: `url(${event.img})` }} 
                        className={`${styles.main__card} 
                          ${styles.card_background} ${styles.card}`}>
                        <div className={styles.card__paddingBlock}>
                          <span className={`${styles.card__span} ${styles.card__span_absolute}`}>{EventName[event.type]}</span>
                          <h3 className={styles.card__title}>{event.title}</h3>
                          <p className={styles.card__text}>{event.text}</p>
                          <a href={event.href}><img className={styles.card__arrow} src='icons/arrow-link.svg' /></a>
                        </div>
                      </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))
                }
              </>
            </SwiperComponent>
          </div>
        </div>
        <div className={`${styles.main__partners} ${styles.partners}`} id='partners'>
          <div className={styles.main__titleBlock}>
            <TitleBlock name='Партнеры' />
          </div>
          <div className={styles.main__cards}>
            <SwiperComponent 
              length={widthSize > 961 ? partners.length : Math.ceil(partners.length / 3)} 
              changeActiveIndex={setActivePartnerIndex} 
              seeCards={widthSize > 961 ? 3 : 1}
            >
              <>
                {widthSize > 961 ?  partners.map((partner, index) => (
                  <SwiperSlide key={`${partner.name}--${index}`}>
                    <div 
                      key={`${partner.name}--${index}`}  
                      style={{ backgroundImage: `url(${partner.img})` }}  
                      className={`${styles.main__card} ${styles.card} ${activePartnerIndex === index ? styles.card_active : ''}`}>
                      <div className={styles.card__block}>
                        <h4 className={styles.card__name}>{partner.name}</h4>
                        <div className={styles.card__infoBlock}>
                          <span className={styles.card__city}>{partner.city}</span>
                          <span className={styles.card__atelier}>{partner.atelier}</span>
                        </div>
                        <a href={partner.href} className={styles.card__projects}>
                          <span className={styles.card__projectText}>проекты</span>
                          <img className={styles.card__arrow} src='icons/arrow-link.svg' />
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                )) :
                sliceArray(partners, 3).map((arr, index)=>(
                  <SwiperSlide key={`partner--${index}`}>
                    <div className={styles.main__cardsMobileBlock}>
                      {arr.map((partner, index) => (
                        <div 
                        key={`${partner.name}--${index}`}
                        style={{ backgroundImage: `url(${partner.img})` }}  
                        className={`${styles.main__card} ${styles.card}`}>
                        <div className={styles.card__block}>
                          <h4 className={styles.card__name}>{partner.name}</h4>
                          <div className={styles.card__infoBlock}>
                            <span className={styles.card__city}>{partner.city}</span>
                            <span className={styles.card__atelier}>{partner.atelier}</span>
                          </div>
                          <a href={partner.href} className={styles.card__projects}>
                            <span className={styles.card__projectText}>проекты</span>
                            <img className={styles.card__arrow} src='icons/arrow-link.svg' />
                          </a>
                        </div>
                      </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))
                }
              </>
            </SwiperComponent>
          </div>
        </div>
        <div className={`${styles.main__cooperation} ${styles.cooperation}`} id='cooperation'>
          <div className={styles.main__titleBlock}>
            <TitleBlock name='Сотрудничество' />
          </div>
          <div className={styles.cooperation__staff}>
            {widthSize > 560 ?
            <>
            {staff.map((employee) => (
              <div className={`${styles.cooperation__employee} ${styles.employee}`}>
                <img src={employee.img} className={styles.employee__img} />
                <h4 className={styles.employee__name}>{employee.name}</h4>
                <p className={styles.employee__post}>{employee.post}</p>
                <a href={`mailto:${employee.email}`} className={styles.employee__email}>{employee.email}</a>
              </div>
            ))}
            </> : 
              <SwiperComponent length={Math.ceil(staff.length / 2)} seeCards={1}>
                <>
                  {sliceArray(staff, 2).map((arr, index) => (
                    <SwiperSlide key={`employee--${index}`}>
                      {arr.map((employee, index)=> (
                        <div key={`${employee.name}==${index}`} className={`${styles.cooperation__employee} ${styles.employee}`}>
                        <img src={employee.img} className={styles.employee__img} />
                        <h4 className={styles.employee__name}>{employee.name}</h4>
                        <p className={styles.employee__post}>{employee.post}</p>
                        <a href={`mailto:${employee.email}`} className={styles.employee__email}>{employee.email}</a>
                      </div>
                      ))}
                    </SwiperSlide>
                  ))}
                </>
              </SwiperComponent>}
          </div>
          <button onClick={() => { setIsDisplayModal(true) }} className={`${styles.header__button} ${styles.cooperation__button}`}>связаться с нами</button>
        </div>
        <div className={`${styles.main__shops} ${styles.shops}`} id='shops'>
          <div className={styles.main__titleBlock}>
            <TitleBlock name='Магазины' />
          </div>
          {shopsList.map((el, index) => (
            <div className={`${styles.shops__shop} ${styles.shop} ${index === 0 ? styles.shop_first : ''}`}>
              <div
                onClick={() => { changeActiveShop(index) }}
                className={`${styles.shop__cityBlock} ${el.isActive ? styles.shop_active : ''}`}>
                <p className={`${styles.shop__city} ${el.isActive ? styles.shop__city_active : ''}`}>{el.city}</p>
                <img className={el.isActive ? styles.shop__img_active : ''} src='icons/arrow-shop.svg' />
              </div>
              <div className={`${styles.shop__list} ${el.isActive ? styles.shop__list_active : ''}`}>
                {el.shops.map((shop) => (
                  <div className={styles.shop__addressBlock}>
                    <img className={styles.shop__photo} src={shop.photo} alt={shop.name} />
                    <p className={styles.shop__text}>{shop.name}</p>
                    <div className={styles.shop__linkBlock}>
                      <span className={styles.shop__linkText}>магазин</span>
                      <img src='icons/arrow-link.svg' />
                    </div>
                  </div>
                ))}
                <YMaps>
                  <div className={styles.shop__map}>
                    <Map width={'100%'} height={widthSize > 375 ? '100%' : '490px'} defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
                  </div>
                </YMaps>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <Navigation isFooter activePath={activePath} changeActivePath={setActivePath}/>
        <div className={styles.footer__links}>
          <a className={styles.footer__link} href='https://keramir-shop.ru/pravila-dostavky/'>Правила доставки</a>
          <a className={styles.footer__link} href='https://keramir-shop.ru/Pravila_ispolzovaniya_podarochnyh_sertifikatov.pdf'>Правила использования подарочных сертификатов КераМир</a>
          <a className={styles.footer__link} href='https://keramir-shop.ru/oferta/'>Соглашение с покупателем</a>
        </div>
      </footer>
      {isDisplayModal && <ModalWindow closeForm={() => { setIsDisplayModal(false) }} />}
    </div>
  )
}

type NavigationProps = {
  isFooter: boolean
  activePath: string
  changeActivePath: (newPath: string) => void
}

function Navigation({isFooter, activePath, changeActivePath}:NavigationProps) {
  const [displayMenu, setDisplayMenu] = useState(false)
  const navigatePage = (path: string) => {
    setDisplayMenu(false)
    changeActivePath(path)
  }
  return (
    <div className={styles.header__content}>
      <div className={`${styles.header__nav} ${styles.header__nav_laptop}`}>
        <img alt='КерраМир' src='logo_white.png' className={styles.header__logo} />
        <div className={`${styles.header__pages} ${!isFooter ? styles.header__pages_header : ''}`}>
          {pageLinks.map((link) => (<a onClick={()=>{navigatePage(link.href)}} key={link.text} className={`${styles.header__page} ${activePath === link.href ? styles.header__page_active : ''}`} href={link.href}>{link.text}</a>))}
        </div>
        <div className={`${styles.header__contacts} ${!isFooter ? styles.header__contacts_header : ''}`}>
          <a className={`${styles.header__tel} ${!isFooter ? styles.header__tel_header : ''}`} href='tel:+73432530268'>+7 (343) 253-02-68</a>
          <a href='https://t.me/username'><img alt='телеграмм' src='icons/telegram.svg' /></a>
          {isFooter || 
          <img 
            onClick={() => { setDisplayMenu(!displayMenu) }} 
            className={styles.header__burger} 
            src={`icons/${displayMenu ? 'close' : 'burger'}.svg`} 
          />}
        </div>
      </div>
      <div className={`${styles.header__pages_mobile} ${displayMenu ? styles.header__pages_mobile_active: ''}`}>
        {pageLinks.map((link) => (<a onClick={()=>{navigatePage(link.href)}} key={link.text} className={`${styles.header__page} ${activePath === link.href ? styles.header__page_active : ''}`} href={link.href}>{link.text}</a>))}
      </div>
      {
        !isFooter ? 
          <div className={`${styles.header__nav} ${styles.header__nav_mobileBlock}`}>
            <div className={styles.header__nav_mobile}>
              <a href='https://t.me/username'><img alt='телеграмм' src='icons/telegram.svg' /></a>
              <img alt='КерраМир' src='logo_white.png' className={styles.header__logo} />
              <img
                onClick={() => { setDisplayMenu(!displayMenu) }}
                className={styles.header__burger}
                src={`icons/${displayMenu ? 'close' : 'burger'}.svg`}
              />
            </div>
            {displayMenu &&
              <div className={`${displayMenu ? styles.header__pages_fullMobile : ''}`}>
              <a className={`${styles.header__tel} ${!isFooter ? styles.header__tel_header : ''}`} href='tel:+73432530268'>+7 (343) 253-02-68</a>
              {pageLinks.map((link) => (<a onClick={()=>{navigatePage(link.href)}} key={link.text} className={`${styles.header__page} ${activePath === link.href ? styles.header__page_active : ''}`} href={link.href}>{link.text}</a>))}
            </div>}
          </div> : 
        <div className={`${styles.header__nav} ${styles.footer__nav}`}>
          <img alt='КерраМир' src='logo_white.png' className={`${styles.header__logo} ${styles.footer__logo}`} />
          <a className={`${styles.header__tel}`} href='tel:+73432530268'>+7 (343) 253-02-68</a>
          <a className={styles.footer__telegram} href='https://t.me/username'><img alt='телеграмм' src='icons/telegram.svg' /></a>
          <div className={`${styles.footer__mobilePages}`}>
            {pageLinks.map((link) => (<a onClick={()=>{navigatePage(link.href)}} key={link.text} className={`${styles.header__page} ${styles.footer__pageMobile} ${activePath === link.href ? styles.header__page_active : ''}`} href={link.href}>{link.text}</a>))}
          </div>
        </div>
      }
    </div>
  )
}

type ModalWindowProps = {
  closeForm: () => void
}

function ModalWindow({ closeForm }: ModalWindowProps) {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [isAgree, setIsAgree] = useState(false)

  const [isFormInvalid, setIsFormInvalid] = useState(false)

  const ref = useRef(null);
  const inputRef = useRef(null);

  const checkForm = () => {
    if (phoneNumber.length === 11 && text.length && name.length && isAgree) {
      return
    }
    setIsFormInvalid(true)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <img onClick={closeForm} className={styles.modal__close} src='icons/close.svg' alt='Закрыть' />
        <div className={styles.modal__titleBlock_mobile}>
          <TitleBlock name='Связаться с нами' />
        </div>
        <div className={`${styles.modal__inputs} ${styles.inputs}`}>
          <div className={styles.inputs__inputBlock}>
            <label className={styles.inputs__label}>Ваше имя</label>
            <input
              value={name}
              onChange={(e) => { setName(e.target.value); setIsFormInvalid(false) }}
              className={`${styles.inputs__input} ${isFormInvalid && !name.length ? styles.inputs__input_incorrect : ''}`}
              placeholder='Иванов Иван'
            />
          </div>
          <div className={styles.inputs__inputBlock}>
            <label className={styles.inputs__label}>Ваш телефон</label>
            <IMaskInput
              mask={'+{7}(000)000-00-00'}
              ref={ref}
              inputRef={inputRef}
              onAccept={(__, mask) => { setPhoneNumber(mask._unmaskedValue); setIsFormInvalid(false) }}
              className={`${styles.inputs__input} ${isFormInvalid && phoneNumber.length !== 11 ? styles.inputs__input_incorrect : ''}`}
              placeholder='+7 (___) ___ - __ - __' />
          </div>
          <div className={styles.inputs__textareaBlock}>
            <label className={styles.inputs__label}>Вашe сообщение</label>
            <textarea
              value={text}
              onChange={(e) => { setText(e.target.value); setIsFormInvalid(false) }}
              className={`${styles.inputs__input} ${isFormInvalid && !text.length ? styles.inputs__input_incorrect : ''}`}
              placeholder='Текст...'
            />
          </div>
        </div>
        <div className={styles.modal__buttons}>
          <button onClick={checkForm} className={styles.header__button}>отправить</button>
          <div className={styles.modal__checkboxBlock}>
            <div onClick={() => { setIsAgree(!isAgree); setIsFormInvalid(false) }} className={styles.modal__checkbox}>
              {!isAgree ?
                <svg className={isFormInvalid && !isAgree ? styles.modal__checkbox_invalid : ''} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4.5" y="4.5" width="19" height="19" stroke="black" />
                </svg>
                :
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4.5" y="4.5" width="19" height="19" stroke="black" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M21 9.70284L11.7828 19L7 14.1757L7.6968 13.4729L11.7828 17.5943L20.3032 9L21 9.70284Z" fill="black" />
                </svg>
              }
              <span className={`${styles.modal__checkboxText} ${isFormInvalid && !isAgree ? styles.inputs__input_incorrect : ''}`}>Я согласен на обработку персональных данных</span>
            </div>
            <a className={styles.modal__link}>Конфиденциальность/Условия использования</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
