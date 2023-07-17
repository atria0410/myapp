import Breadcrumbs from '@/components/breadcrumbs'
import MenuBtn from '@/components/menuBtn'
import { BreakfastDining, GridOn, ImportExport, Input, Message, Storage } from '@mui/icons-material'
import { Grid } from '@mui/material'

// パンくずリスト
const breadcrumbs = [{ text: 'sample', link: '/sample' }]

export default function Sample() {
  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={4}>
        <Grid item>
          <MenuBtn title="From" link="/sample/form" icon={Input} />
        </Grid>
        <Grid item>
          <MenuBtn title="Dialog" link="/sample/dialog" icon={Message} />
        </Grid>
        <Grid item>
          <MenuBtn title="Toast" link="/sample/toast" icon={BreakfastDining} />
        </Grid>
        <Grid item>
          <MenuBtn title="CRUD 1" link="/sample/crud1" icon={Storage} />
        </Grid>
        <Grid item>
          <MenuBtn title="CRUD 2" link="/sample/crud2" icon={GridOn} />
        </Grid>
        <Grid item>
          <MenuBtn title="CSV Import/Export" link="/sample/csv_import_export" icon={ImportExport} />
        </Grid>
      </Grid>
    </>
  )
}
