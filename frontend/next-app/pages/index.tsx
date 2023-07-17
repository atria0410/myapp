import Breadcrumbs from '@/components/breadcrumbs'

// パンくずリスト
const breadcrumbs = [{ text: 'Home', link: '/' }]

export default function Home() {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <div>This is index page</div>
    </>
  )
}
