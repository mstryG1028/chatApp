import { Camera } from "lucide-react";

const ProfileUpload = ({ preview, onChange }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <label
        htmlFor="profile-image"
        className="
          group
          relative

          h-28
          w-28

          cursor-pointer
          overflow-hidden

          rounded-full

          border-2
          border-border

          bg-surface

          transition-all
          duration-200

          hover:border-primary
        "
      >
        {preview ? (
          <img
            src={preview}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
            "
          >
            <Camera size={30} className="text-text-muted" />
          </div>
        )}

        <div
          className="
            absolute
            inset-0

            flex
            items-center
            justify-center

            bg-black/50

            opacity-0

            transition-opacity
            duration-200

            group-hover:opacity-100
          "
        >
          <Camera size={22} className="text-white" />
        </div>
      </label>

      <input
        id="profile-image"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />

      <div className="text-center">
        <p className="text-sm font-medium text-text">Upload Profile Photo</p>

        <p className="mt-1 text-xs text-text-muted">PNG, JPG or JPEG</p>
      </div>
    </div>
  );
};

export default ProfileUpload;
