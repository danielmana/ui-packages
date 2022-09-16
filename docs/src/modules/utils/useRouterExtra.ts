import { useRouter } from 'next/router';

export default function useRouterExtra() {
  const router = useRouter();
  const asPathWithoutLang = router.asPath.replace(/^\/[a-zA-Z]{2}\//, '/');
  let product = asPathWithoutLang.replace(/^\/([^/]+)\/.*/, '$1');
  if (asPathWithoutLang.startsWith('/x')) {
    product = asPathWithoutLang.replace('/x/react-', '').replace(/\/.*/, '');
  }
  return {
    ...router,
    asPathWithoutLang,
    product: product as
      | 'base'
      | 'material-ui'
      | 'system'
      | 'data-grid'
      | 'date-pickers'
      | 'ui-core'
      | 'ui-components',
    isMuiX: asPathWithoutLang.startsWith('/x'),
  };
}
