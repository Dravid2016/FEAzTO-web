import React from 'react';

// ============================================================
// EXACT GRANDMOTHER HERO ASSET (From User's Character Sheet & Reference)
// ============================================================
export const GrandmotherHeroAsset: React.FC<{ width?: string; height?: string }> = ({
  width = '100%',
  height = 'auto'
}) => {
  return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/assets/gm_green_saree.png"
        alt="FEAZTO Grandmother Hero Character"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          maxWidth: '320px',
          maxHeight: '320px',
          filter: 'drop-shadow(0 8px 16px rgba(28,25,23,0.1))'
        }}
      />
    </div>
  );
};

// ============================================================
// GRANDMOTHER COOKING ASSET (From User's Character Sheet)
// ============================================================
export const GrandmotherCookingAsset: React.FC<{ width?: string; height?: string }> = ({
  width = '100%',
  height = 'auto'
}) => {
  return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/assets/gm_red_blouse.png"
        alt="FEAZTO Grandmother Cooking"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          maxWidth: '240px',
          maxHeight: '240px'
        }}
      />
    </div>
  );
};

// ============================================================
// DELIVERY PARTNER ASSET (From User's Character Sheet)
// ============================================================
export const DeliveryPartnerAsset: React.FC<{ width?: string; height?: string }> = ({
  width = '100%',
  height = 'auto'
}) => {
  return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/assets/delivery_scooter.png"
        alt="FEAZTO Delivery Scooter Partner"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          maxWidth: '240px',
          maxHeight: '240px'
        }}
      />
    </div>
  );
};

// ============================================================
// FEMALE COOK ASSET (From User's Character Sheet)
// ============================================================
export const FemaleCookAsset: React.FC<{ width?: string; height?: string }> = ({
  width = '100%',
  height = 'auto'
}) => {
  return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/assets/female_cook.png"
        alt="FEAZTO Female Home Cook"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          maxWidth: '200px',
          maxHeight: '200px'
        }}
      />
    </div>
  );
};

// ============================================================
// CUSTOMER EATING ASSET (From User's Character Sheet)
// ============================================================
export const CustomerEatingAsset: React.FC<{ width?: string; height?: string }> = ({
  width = '100%',
  height = 'auto'
}) => {
  return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="/assets/customer_eating.png"
        alt="FEAZTO Happy Customer Eating"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          maxWidth: '200px',
          maxHeight: '200px'
        }}
      />
    </div>
  );
};
