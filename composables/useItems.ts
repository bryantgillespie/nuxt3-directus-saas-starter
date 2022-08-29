export default function useItems() {
  // Get API client
  const { $directus } = useNuxtApp()

  // Loading and error state
  const loading = ref<boolean>(false)
  const error = ref<object | string>(null)

  // createOne
  const createOne = async (
    collection: string,
    item: Object,
    params?: Object
  ) => {
    const data = ref<object>({})

    loading.value = true
    try {
      const response = await $directus.items(collection).createOne(item, params)
      data.value = response
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }

    return { loading, error, data }
  }

  // createMany
  const createMany = async (
    collection: string,
    items: Array<object>,
    params: Object
  ) => {
    const data = ref([] as Array<object>)

    loading.value = true
    try {
      const { data: response } = await $directus
        .items(collection)
        .createMany(items, params)
      data.value = response
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }

    return { loading, error, data }
  }

  // readOne
  const readOne = async (
    collection: string,
    id: string | number,
    params: Object
  ) => {
    const data = ref<object>({})

    loading.value = true
    try {
      const response = await $directus.items(collection).readOne(id, params)
      data.value = response
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }

    return { loading, error, data }
  }

  // readByQuery
  const readByQuery = async (collection: string, params: Object) => {
    const data = ref([] as Array<object>)

    loading.value = true
    try {
      const { data: response } = await $directus
        .items(collection)
        .readByQuery(params)
      data.value = response
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
    const side = process.server ? 'server' : 'client'
    console.log('Read from the' + side + ' side')
    console.log('Data from the' + side + ' side:', data.value)
    return { loading, error, data }
  }

  // updateOne
  const updateOne = async () => {}

  // updateMany
  const updateMany = async () => {}

  // deleteOne
  const deleteOne = async (collection: string, id: string | number) => {
    const data = ref<object>({})
    loading.value = true
    try {
      const response = await $directus.items(collection).deleteOne(id)
      data.value = response
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
    return { loading, error, data }
  }

  // deleteMany
  const deleteMany = async (
    collection: string,
    ids: Array<number | string>
  ) => {
    const data = ref<object>({})
    loading.value = true
    try {
      const response = await $directus.items(collection).deleteMany(ids)
      data.value = response
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
    return { loading, error, data }
  }

  // Non-SDK Methods
  // upsertOne
  const upsertOne = async () => {}

  // duplicateOne
  const duplicateOne = async () => {}

  // sortItems
  const sortItems = async () => {}

  return {
    readOne,
    readByQuery,
    createOne,
    createMany,
    deleteOne,
    deleteMany,
    upsertOne,
    duplicateOne,
    sortItems,
  }
}
