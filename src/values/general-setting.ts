import type {
  CatalogGalleryEventForm,
  CatalogGalleryModelForm,
  CatalogGalleryVideoForm,
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
    titleHeaderModels: '',
    descriptionHeaderModels: '',
    catalogGalleryModels: [],
  }

  static updateCatalogGalleryService: GeneralSettingCatalogGalleryServicesForm = {
    image: '',
    active: false,
    title: '',
    description: '',
  }

  static catalogGalleryModelForm: CatalogGalleryModelForm = {
    image: '',
    active: false,
    name: '',
    category: '',
  }

  static catalogGalleryEventForm: CatalogGalleryEventForm = {
    image: '',
    active: false,
    name: '',
    category: '',
  }

  static catalogGalleryVideoForm: CatalogGalleryVideoForm = {
    title: '',
    videoUrl: '',
    active: false,
  }
}
