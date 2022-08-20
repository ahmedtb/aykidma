<?php

namespace App\Notifications\provider;

use App\Models\User;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use App\Notifications\ExpoChannel;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewOrderCreated extends Notification
{
    use Queueable;

    public User $user;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(User $user, Order $order)
    {
        //
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', ExpoChannel::class];
    }

    /**
     * Get the database representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toDatabase($notifiable)
    {
        return [
            'title' => 'new order',
            'body' => 'created by ' . $this->user->name,
        ];
    }

    
    public function toExpoApp($notifiable)
    {

        return [
            'title' => 'new order',
            'body' => 'created by ' . $this->user->name,
        ];
    }
}
