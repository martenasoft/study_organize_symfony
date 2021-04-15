<?php

namespace App\Entity;

use App\Repository\CalendarRepository;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as JMS;


/**
 * @ORM\Entity(repositoryClass=CalendarRepository::class)
 */
class Calendar
{
    public const ICONS = [
        "fa-adjust",
        "fa-asterisk",
        "fa-ban",
        "fa-bar-chart-o",
        "fa-barcode",
        "fa-flask",
        "fa-beer",
        "fa-bell-o",
        "fa-bell",
        "fa-bolt",
        "fa-book",
        "fa-bookmark",
        "fa-bookmark-o",
        "fa-briefcase",
        "fa-bullhorn",
        "fa-calendar",
        "fa-camera",
        "fa-camera-retro",
        "fa-certificate",
        "fa-check-square-o",
        "fa-square-o",
        "fa-circle",
        "fa-circle-o",
        "fa-cloud",
        "fa-cloud-download",
        "fa-cloud-upload",
        "fa-coffee",
        "fa-cog",
        "fa-cogs",
        "fa-comment",
        "fa-comment-o",
        "fa-comments",
        "fa-comments-o",
        "fa-credit-card",
        "fa-tachometer",
        "fa-desktop",
        "fa-arrow-circle-o-down",
        "fa-download",
        "fa-pencil-square-o",
        "fa-envelope",
        "fa-envelope-o",
        "fa-exchange",
        "fa-exclamation-circle",
        "fa-external-link",
        "fa-eye-slash",
        "fa-eye",
        "fa-video-camera",
        "fa-fighter-jet",
        "fa-film",
        "fa-filter",
        "fa-fire",
        "fa-flag",
        "fa-folder",
        "fa-folder-open",
        "fa-folder-o",
        "fa-folder-open-o",
        "fa-cutlery",
        "fa-gift",
        "fa-glass",
        "fa-globe",
        "fa-users",
        "fa-hdd-o",
        "fa-headphones",
        "fa-heart",
        "fa-heart-o",
        "fa-home",
        "fa-inbox",
        "fa-info-circle",
        "fa-key",
        "fa-leaf",
        "fa-laptop",
        "fa-gavel",
        "fa-lemon-o",
        "fa-lightbulb-o",
        "fa-lock",
        "fa-unlock",
        "glyphicon-asterisk",
        "glyphicon-plus",
        "glyphicon-euro",
        "glyphicon-minus",
        "glyphicon-cloud",
        "glyphicon-envelope",
        "glyphicon-pencil",
        "glyphicon-glass",
        "glyphicon-music",
        "glyphicon-search",
        "glyphicon-heart",
        "glyphicon-star",
        "glyphicon-star",
        "glyphicon-user",
        "glyphicon-film",
        "glyphicon-th",
        "glyphicon-th",
        "glyphicon-th",
        "glyphicon-ok",
        "glyphicon-remove",
        "glyphicon-zoom-in",
        "glyphicon-zoom-out",
        "glyphicon-off",
        "glyphicon-signal",
        "glyphicon-cog",
        "glyphicon-trash",
        "glyphicon-home",
        "glyphicon-file",
        "glyphicon-time",
        "glyphicon-road",
        "glyphicon-download",
        "glyphicon-download",
        "glyphicon-upload",
        "glyphicon-inbox",
        "glyphicon-play",
        "glyphicon-repeat",
        "glyphicon-refresh",
        "glyphicon-list",
        "glyphicon-lock",
        "glyphicon-flag",
        "glyphicon-headphones",
        "glyphicon-volume-off",
        "glyphicon-volume-down",
        "glyphicon-volume-up",
        "glyphicon-qrcode",
        "glyphicon-barcode",
        "glyphicon-tag",
        "glyphicon-tags",
        "glyphicon-book",
        "glyphicon-bookmark",
        "glyphicon-print",
        "glyphicon-camera",
        "glyphicon-font",
        "glyphicon-bold",
        "glyphicon-italic",
        "glyphicon-text-height",
        "glyphicon-text-width",
        "glyphicon-align-left",
        "glyphicon-align-center",
        "glyphicon-align-right",
        "glyphicon-align-justify",
        "glyphicon-list",
        "glyphicon-indent-left",
        "glyphicon-indent-right",
        "glyphicon-facetime-video",
        "glyphicon-picture",
        "glyphicon-map-marker",
        "glyphicon-adjust",
        "glyphicon-tint",
        "glyphicon-edit",
        "glyphicon-share",
        "glyphicon-check",
        "glyphicon-move",
        "glyphicon-step-backward",
        "glyphicon-fast-backward",
        "glyphicon-backward",
    ];
    public const COLORS = [
        '#fff',
        '#f2f6f9',
        '#646871',
        '#ac725e',
        '#d06b64',
        '#f83a22',
        '#fa573c',
        '#ff7537',
        '#ffad46',
        '#42d692',
        '#16a765',
        '#7bd148',
        '#b3dc6c',
        '#fbe983',
        '#fad165',
        '#92e1c0',
        '#9fe1e7',
        '#9fc6e7',
        '#4986e7',
        '#9a9cff',
        '#b99aff',
        '#c2c2c2',
        '#cabdbf',
        '#cca6ac',
        '#f691b2',
        '#cd74e6',
        '#a47ae2',
        '#555'
    ];
    public const STATUS_ACTIVE = 1;
    public const STATUS_DONE = 2;
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="start")
     */
    private User $user;

    /**
     * @JMS\Type("DateTime<'Y-m-d'>")
     * @ORM\Column(type="datetime")
     */
    private \DateTimeInterface $start;

    /**
     * @JMS\Type("DateTime<'Y-m-d'>")
     * @ORM\Column(type="datetime", nullable=true)
     */
    private \DateTimeInterface $end;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private \DateTimeInterface $changedStatus;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $title;

    /**
     * @ORM\Column(type="text", nullable=true)
     */
    private ?string $about = "";

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private ?string $color = "";

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private ?string $textColor = "";

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private ?string $icon = "";

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private ?string $iconColor = "";

    /**
     * @ORM\Column(type="string", length=16, nullable=true)
     */
    private ?string $iconTextColor = "";

    /**
     * @ORM\Column(type="smallint")
     */
    private $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getStart(): ?\DateTimeInterface
    {
        return $this->start;
    }

    public function setStart(\DateTimeInterface $start): self
    {
        $this->start = $start;

        return $this;
    }

    public function getEnd(): ?\DateTimeInterface
    {
        return $this->end;
    }

    public function setEnd(?\DateTimeInterface $end): self
    {
        $this->end = $end;

        return $this;
    }

    public function getChangedStatus(): \DateTimeInterface
    {
        return $this->changedStatus;
    }

    public function setChangedStatus(\DateTimeInterface $changedStatus): self
    {
        $this->changedStatus = $changedStatus;
        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getAbout(): ?string
    {
        return $this->about;
    }

    public function setAbout(?string $about): self
    {
        $this->about = $about;

        return $this;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): self
    {
        $this->color = $color;

        return $this;
    }

    public function getTextColor(): ?string
    {
        return $this->textColor;
    }

    public function setTextColor(?string $textColor): self
    {
        $this->textColor = $textColor;
        return $this;
    }

    public function getIconColor(): ?string
    {
        return $this->iconColor;
    }

    public function setIconColor(?string $iconColor): self
    {
        $this->iconColor = $iconColor;
        return $this;
    }

    public function getIconTextColor(): ?string
    {
        return $this->iconTextColor;
    }

    public function setIconTextColor(?string $iconTextColor): self
    {
        $this->iconTextColor = $iconTextColor;
        return $this;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }

    public function setIcon(?string $icon): self
    {
        $this->icon = $icon;
        return $this;
    }

    public function getStatus(): ?int
    {
        return $this->status;
    }

    public function setStatus(int $status): self
    {
        $this->status = $status;

        return $this;
    }

}
