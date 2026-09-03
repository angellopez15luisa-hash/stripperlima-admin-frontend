import type {
  GeneralSettingCatalogGalleryServicesForm,
  GeneralSettingForm,
} from '@/types/general-setting'

export class GeneralSettingValue {
  static updateForm: GeneralSettingForm = {
    id: 0,
    titleStart: '',
    descriptionStart: '',
    socialLinks: [],
    banners: [],
    titleAron: '',
    subtitleAron: '',
    titleEditorAron: '',
    descriptionEditorAron: '',
    listLabelsEditorAron: [],
    textHtmlEditorAron: '',
    galeryImagesAron: [],
    titleHeaderServices: '',
    descriptionHeaderServices: '',
    catalogGalleryServices: [],
  }

  static updateCatalogGalleryService: GeneralSettingCatalogGalleryServicesForm = {
    image: '',
    active: false,
    title: '',
    description: '',
  }
}
