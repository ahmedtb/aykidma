<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\ServiceProvider;
use App\Models\UserNotification;
use App\Notifications\user\OrderResumed;
use App\Notifications\user\OrderAccpeted;
use App\Notifications\user\ProviderEnrolled;
use App\Notifications\provider\NewOrderCreated;
use App\Notifications\Provider\OrderMarkedAsDone;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Notifications\user\ProviderAccountActivated;

class UserNotificationFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UserNotification::class;

    public function getRandomFirstOrCreate(string $className, $spcifiedColumns = [])
    {
        // if (!$this->canCreate)
        $random = $className::inRandomOrder()->where($spcifiedColumns)->first();
        if ($random)
            return $random;
        else {
            return $className::factory()->create($spcifiedColumns);
        }
    }

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $notifiable_types = [User::class, ServiceProvider::class];
        $notification_types = [
            User::class => [OrderAccpeted::class, OrderResumed::class, ProviderAccountActivated::class, ProviderEnrolled::class,],
            ServiceProvider::class => [NewOrderCreated::class, OrderMarkedAsDone::class],
        ];
        $notifiable = $this->getRandomFirstOrCreate($notifiable_types[random_int(0, sizeof($notifiable_types) - 1)]);
        return [
            'type' => $this->faker->sentence(),
            'notifiable_type' => get_class($notifiable),
            'notifiable_id' => $notifiable->id,
            'data' => [
                
            ]
        ];
    }
}
