import Breadcrumbs from '@/components/breadcrumbs'
import {
  Checkbox,
  DatePicker,
  MonthPicker,
  Radio,
  Select,
  Slider,
  Switch,
  TextArea,
  TextField,
  TimePicker
} from '@/components/form'
import Paper from '@/components/paper'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Stack } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

// パンくずリスト
const breadcrumbs = [
  { text: 'sample', link: '/sample' },
  { text: 'form', link: '/sample/form' }
]

// 地域オブジェクト型
type Area = {
  no: number
  name: string
}

// 地域セレクトボックスオプション
const areaOptions: Area[] = [
  { no: 1, name: '北海道' },
  { no: 2, name: '東北' },
  { no: 3, name: '関東' },
  { no: 4, name: '中部' },
  { no: 5, name: '近畿' },
  { no: 6, name: '中国' },
  { no: 7, name: '四国' },
  { no: 8, name: '九州' }
]

// フォーム項目型
interface SampleFormInput {
  name: string
  profile: string
  area: Area | null
  datetime: Date | null
  height: number
  gender: number
  isSmoking: boolean
  isPublic: boolean
}

// バリデーションルール
const schema = yup.object({
  name: yup.string().required('必須項目です'),
  profile: yup.string().required('必須項目です'),
  area: yup
    .object<Area>()
    .shape({
      no: yup.number().required(),
      name: yup.string().required()
    })
    .required('必須項目です'),
  datetime: yup.date().required('必須項目です'),
  height: yup.number().required(),
  gender: yup.number().required(),
  isSmoking: yup.boolean().required(),
  isPublic: yup.boolean().required()
})

export default function Form() {
  const { control, watch, handleSubmit } = useForm<SampleFormInput>({
    defaultValues: {
      name: '',
      profile: '',
      area: null,
      datetime: null,
      height: 170,
      gender: 1,
      isSmoking: false,
      isPublic: false
    },
    resolver: yupResolver<SampleFormInput>(schema)
  })

  const name = watch('name')
  const profile = watch('profile')
  const area = watch('area')
  const datetime = watch('datetime')
  const height = watch('height')
  const gender = watch('gender')
  const isSmoking = watch('isSmoking')
  const isPublic = watch('isPublic')

  const onSubmit: SubmitHandler<SampleFormInput> = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Paper>
        <form>
          <Stack spacing={4}>
            <TextField control={control} name="name" label="名前" />
            {name}

            <TextArea control={control} name="profile" label="プロフィール" rows={4} />
            {profile}

            <Select control={control} name="area" options={areaOptions} optionLabel="name" label="地域" />
            {JSON.stringify(area)}

            <Stack direction="row" spacing={4}>
              <DatePicker control={control} name="datetime" label="年月日" />

              <MonthPicker control={control} name="datetime" label="年月" />

              <TimePicker control={control} name="datetime" label="時分" />
            </Stack>
            {datetime?.toString()}

            <Slider
              control={control}
              name="height"
              label="身長"
              min={0}
              max={200}
              marks={[
                { value: 0, label: '0cm' },
                { value: 100, label: '100cm' },
                { value: 200, label: '200cm' }
              ]}
            />
            {height}

            <Radio
              control={control}
              name="gender"
              label="性別"
              row
              options={[
                { value: 1, label: '男性' },
                { value: 2, label: '女性' }
              ]}
            />
            {gender}

            <Checkbox control={control} name="isSmoking" boxLabel="喫煙" />
            {isSmoking.toString()}

            <Switch control={control} name="isPublic" label="プロフィールを公開する" onLabel="公開" offLabel="非公開" />
            {isPublic.toString()}

            <Button color="primary" variant="contained" size="large" onClick={handleSubmit(onSubmit)}>
              登録
            </Button>
          </Stack>
        </form>
      </Paper>
    </>
  )
}
