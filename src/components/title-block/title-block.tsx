import styles from './title-block.module.scss'

type TitleBlockProps = {
  name: string
}

export default function TitleBlock({name}:TitleBlockProps){
  return (
    <div className={styles.container}>
      <h2 className={styles.text}>{name}</h2>
      <img className={styles.img} src='icons/star.svg'/>
    </div>
  )
}