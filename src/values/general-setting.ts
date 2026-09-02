import type { GeneralSettingForm } from '@/types/general-setting'

export class GeneralSetting {
  static updateForm: GeneralSettingForm = {
    id:0,
    titleStart: '',
    descriptionStart: '',
    socialLinks: [],
    banners: [],
  }
}
