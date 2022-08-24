// Create some re-useable definitions because
// many input types are identical in how
// we want to style them.
const textClassification = {
  label:
    'block mb-1 font-medium text-sm formkit-invalid:text-red-500 text-gray-700 dark:text-gray-200',
  inner: `transition duration-150
        border
        border-gray-300
        formkit-invalid:border-red-500
        rounded-lg mb-1
        overflow-hidden
        focus-within:ring-primary-500
        focus-within:border-primary-500
        focus-within:ring-1
        transition duration-150
        dark:border-gray-700
        dark:bg-gray-800
      `,

  input: `w-full h-10 px-3 transition duration-150 dark:bg-gray-800 border-none text-lg md:text-base text-gray-700 placeholder-gray-400 dark:placeholder-gray-600 dark:text-white`,
}
const boxClassification = {
  fieldset: 'max-w-md border border-gray-400 rounded-md px-2 pb-1',
  legend: 'font-bold text-sm',
  wrapper: 'flex items-center mb-2 cursor-pointer',
  help: 'mb-2',
  input:
    'form-check-input appearance-none h-5 w-5 mr-2 border border-gray-400 rounded bg-white text-primary-500 focus:ring-offset-2 focus:ring-primary-500 focus:outline-none focus:ring-1  transition duration-150',
  label: 'text-sm text-gray-700 font-ui mt-1',
}
const buttonClassification = {
  wrapper: 'mb-1',
  input: 'btn btn-primary',
}

// export our definitions using our above
// templates and declare one-offs and
// overrides as needed.
export default {
  // the global key will apply to all inputs
  global: {
    outer: 'mb-5 formkit-disabled:opacity-50 ',
    help: 'text-xs text-gray-500',
    messages: 'list-none p-0 mt-1 mb-0',
    message: 'text-red-500 mb-1 text-xs',
  },
  button: buttonClassification,
  color: {
    label: 'block mb-1 font-bold text-sm',
    input:
      'w-16 h-8 appearance-none cursor-pointer border border-gray-300 rounded-md mb-2 p-1',
  },
  date: textClassification,
  'datetime-local': textClassification,
  checkbox: boxClassification,
  email: textClassification,
  file: {
    label: 'block mb-1 font-bold text-sm',
    inner: 'max-w-md cursor-pointer',
    input:
      'text-gray-600 text-sm mb-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary-500 file:text-white hover:file:bg-primary-600',
    noFiles: 'block text-gray-800 text-sm mb-1',
    fileItem: 'block flex text-gray-800 text-sm mb-1',
    fileRemove: 'ml-auto text-primary-500 text-sm',
  },
  month: textClassification,
  number: {
    ...textClassification,
    input:
      'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400 text-right',
  },
  password: textClassification,
  radio: {
    ...boxClassification,
    input: boxClassification.input.replace('rounded', 'rounded-full'),
  },
  range: {
    inner: 'max-w-md',
    input:
      'form-range appearance-none w-full h-2 p-0 bg-gray-200 rounded-full focus:outline-none focus:ring-0 focus:shadow-none',
  },
  search: textClassification,
  select: textClassification,
  submit: buttonClassification,
  tel: textClassification,
  text: textClassification,
  textarea: {
    ...textClassification,
    input:
      'block w-full h-32 px-3 border-none text-base text-gray-700 placeholder-gray-400 focus:shadow-outline',
  },
  time: textClassification,
  url: textClassification,
  week: textClassification,
}
