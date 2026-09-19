/**
 * Stripe 公開設定・価格IDマッピング
 * （※秘密キーはフロントエンドに含めず、サーバー環境変数 STRIPE_SECRET_KEY として管理します）
 */

export const STRIPE_PUBLISHABLE_KEY = 
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_51UFP3dFLbsxTsQETIiwQWQ8Mnr5PhYn729vqaOhxkTJr7EnQMu94PuoBUbdVm3ddu6VVLZaaZBMvGdQSLFnbarCc00AHFWcMsV';

export const STRIPE_PRICES = {
  standard: {
    monthly: 'price_1UFZQqFLbsxTsQET013NZkH7', // 480円/月
    yearly: 'price_1UFZRJFLbsxTsQETs8qGgzrw'   // 4,800円/年
  },
  premium: {
    monthly: 'price_1UFZRKFLbsxTsQETf6jvqx17', // 980円/月
    yearly: 'price_1UFZRLFLbsxTsQETpuR20bQ9'   // 9,800円/年
  }
};
