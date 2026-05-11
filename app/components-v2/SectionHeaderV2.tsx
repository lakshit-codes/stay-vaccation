import React from 'react';

interface SectionHeaderV2Props {
  label: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeaderV2: React.FC<SectionHeaderV2Props> = ({
  label,
  title,
  titleHighlight,
  subtitle,
  centered = false,
  className = ''
}) => {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <div className="section-label reveal visible">{label}</div>
      <h2 className="section-title reveal visible delay-1">
        {title} {titleHighlight && <span>{titleHighlight}</span>}
      </h2>
      {subtitle && (
        <p className={`section-sub reveal visible delay-2 ${centered ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeaderV2;
