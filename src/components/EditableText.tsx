import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface EditableTextProps {
  value: string;
  onChange: (next: string) => void;
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'div';
  className?: string;
  dir?: 'rtl' | 'ltr';
  multiline?: boolean;
  placeholder?: string;
  style?: React.CSSProperties;
  id?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  as: Tag = 'p',
  className = '',
  dir,
  multiline = false,
  placeholder = 'Click to edit...',
  style,
  id,
}) => {
  const { isEditMode } = usePortfolio();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const draftRef = useRef(value);
  const editingRef = useRef(false);

  draftRef.current = draft;
  editingRef.current = editing;

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (!isEditMode && editingRef.current) {
      setEditing(false);
      if (draftRef.current !== value) {
        onChange(draftRef.current);
      }
    }
  }, [isEditMode, value, onChange]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  if (!isEditMode) {
    return (
      <Tag id={id} className={className} dir={dir} style={style}>
        {value}
      </Tag>
    );
  }

  const commit = () => {
    setEditing(false);
    if (draft !== value) {
      onChange(draft);
    }
  };

  if (editing) {
    const sharedProps = {
      value: draft,
      dir,
      style,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDraft(e.target.value),
      onBlur: commit,
      onClick: (e: React.MouseEvent) => e.stopPropagation(),
      className: `${className} w-full bg-[#1a050b] border border-[#8A1526] rounded-lg px-2.5 py-1 outline-none ring-2 ring-[#8A1526]/40 text-[#E9DEDE]`,
    };

    if (multiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          rows={Math.max(2, Math.min(14, Math.max(draft.split('\n').length + 1, Math.ceil(draft.length / 48))))}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setDraft(value);
              setEditing(false);
            } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              commit();
            }
          }}
          {...sharedProps}
        />
      );
    }

    return (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setDraft(value);
            setEditing(false);
          } else if (e.key === 'Enter') {
            e.preventDefault();
            commit();
          }
        }}
        {...sharedProps}
      />
    );
  }

  return (
    <Tag
      id={id}
      dir={dir}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setEditing(true);
      }}
      title="اضغط للتعديل | Click to edit"
      className={`${className} cursor-text rounded transition-[background-color,outline-color] duration-300 ease-out hover:outline-dashed hover:outline-1 hover:outline-[#8A1526] hover:bg-[#8A1526]/10 px-1 -mx-1`}
    >
      {value || <span className="opacity-50 italic">{placeholder}</span>}
    </Tag>
  );
};
